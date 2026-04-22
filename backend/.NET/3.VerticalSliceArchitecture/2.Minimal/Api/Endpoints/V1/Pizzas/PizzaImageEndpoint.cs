namespace Api.Endpoints.V1.Pizzas;

using Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

public static class PizzaImageEndpoint
{
    private const string PngMediaType = "image/png";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromDays(7);

    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapGet($"{Config.ENDPOINT}/{{pizzaId:int}}/image", (int pizzaId, PizzaImageService imageService, HttpContext context)
        => BuildResult(pizzaId, imageService, context))
            .WithTags(Config.TAG)
            .WithName("GetPizzaImage")
            .WithSummary("Returns a pizza image with caching headers and CDN-friendly ETags")
            .Produces(StatusCodes.Status200OK, typeof(void), PngMediaType)
            .Produces(StatusCodes.Status304NotModified)
            .Produces(StatusCodes.Status404NotFound);

    private static IResult BuildResult(int pizzaId, PizzaImageService imageService, HttpContext context)
    {
        var image = imageService.GetImage(pizzaId);
        if (image is null)
        {
            return Results.NotFound();
        }

        if (IsNotModified(context, image))
        {
            context.Response.Headers[HeaderNames.ETag] = image.eTag;
            return Results.StatusCode(StatusCodes.Status304NotModified);
        }

        var headers = context.Response.GetTypedHeaders();
        headers.CacheControl = new CacheControlHeaderValue
        {
            Public = true,
            MaxAge = CacheDuration,
        };
        headers.LastModified = image.lastModified;
        context.Response.Headers[HeaderNames.Vary] = "Accept";
        context.Response.Headers[HeaderNames.ETag] = image.eTag;

        return Results.File(image.content, image.mediaType ?? PngMediaType, image.fileName);
    }

    private static bool IsNotModified(HttpContext context, PizzaImageDefinition image)
    {
        if (context.Request.Headers.TryGetValue(HeaderNames.IfNoneMatch, out var etags) &&
            etags.Any(tag => string.Equals(tag.Trim(), image.eTag, StringComparison.OrdinalIgnoreCase)))
        {
            return true;
        }

        if (context.Request.Headers.TryGetValue(HeaderNames.IfModifiedSince, out var modifiedSince) &&
            DateTimeOffset.TryParse(modifiedSince, out var since) &&
            since.ToUniversalTime() >= image.lastModified.ToUniversalTime())
        {
            return true;
        }

        return false;
    }
}
