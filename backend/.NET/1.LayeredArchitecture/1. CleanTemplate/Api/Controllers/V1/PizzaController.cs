namespace Api.Controllers.V1;

using Api.Services;
using Common.V1.Pizzas.Models;
using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Queries;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

public sealed class PizzaController : ApiController
{
    private const string SvgMediaType = "image/svg+xml";

    private static readonly TimeSpan CacheDuration = TimeSpan.FromDays(7);

    [HttpGet("/v1/pizzas/{pizzaId:int}/image", Name = "GetPizzaImage", Order = 10)]
    public IActionResult GetImage(int pizzaId, [FromServices] PizzaImageService imageService)
    {
        var image = imageService.GetImage(pizzaId);
        if (image is null)
        {
            return this.NotFound();
        }

        if (IsNotModified(this.HttpContext, image))
        {
            this.Response.Headers[HeaderNames.ETag] = image.eTag;
            return this.StatusCode(StatusCodes.Status304NotModified);
        }

        SetCacheHeaders(this.Response, image);
        return this.File(image.content, image.mediaType ?? SvgMediaType, image.fileName);
    }

    /// <summary>
    ///     Get Pizza by Id.
    /// </summary>
    /// <param name="id">int.</param>
    /// <param name="cancellationToken">Cancellation Token.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<Result<PizzaModel>>> Get(int id, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Query(new GetPizzaQuery { Id = id }, cancellationToken), this);

    /// <summary>
    ///     Get all Pizzas.
    /// </summary>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    /// <param name="query">Pizza Search Model</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    [HttpPost]
    [Route("Search", Order = 100)]
    public async Task<ActionResult<Result<IEnumerable<PizzaModel>>>> Search(GetAllPizzasQuery query, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Query(query, cancellationToken), this);

    /// <summary>
    ///     Create Pizza.
    /// </summary>
    /// <remarks>
    ///     Pizza request:
    ///     POST Pizza
    ///     {
    ///         "name" : "sample"
    ///     }
    /// </remarks>
    /// <param name="command">Pizza Create Model.</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpPost]
    [Route("", Order = 110)]
    public async Task<ActionResult<Result<PizzaModel>>> Create(CreatePizzaCommand command, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Send(command, cancellationToken), this);

    /// <summary>
    ///     Update Pizza.
    /// </summary>
    /// <remarks>
    ///     Pizza request:
    ///     PATCH Pizza/9a3117a7-2d1f-4a2d-8fac-7f022539ea50
    ///     {
    ///         "name" : "sample 2"
    ///     }
    /// </remarks>
    /// <param name="id">Id.</param>
    /// <param name="model">Pizza Update Model.</param>
    /// <param name="cancellationToken">Cancellation Token.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpPatch("{id}", Order = 120)]
    public async Task<ActionResult<Result<PizzaModel>>> Update(int id, UpdatePizzaModel model, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Send(new UpdatePizzaCommand { Id = id, Model = model }, cancellationToken), this);

    /// <summary>
    ///     Remove Pizza by Id.
    /// </summary>
    /// <param name="id">Id.</param>
    /// <param name="cancellationToken">Cancellation Token.</param>
    /// <returns>A <see cref="Task" /> representing the asynchronous operation.</returns>
    [HttpDelete("{id}")]
    public async Task<ActionResult<Result>> Delete(int id, CancellationToken cancellationToken = default)
        => ApiResponseHelper.ResponseOutcome(await this.Dispatcher.Send(new DeletePizzaCommand { Id = id }, cancellationToken), this);

    private static void SetCacheHeaders(HttpResponse response, PizzaImageDefinition image)
    {
        var headers = response.GetTypedHeaders();
        headers.CacheControl = new CacheControlHeaderValue
        {
            Public = true,
            MaxAge = CacheDuration,
        };
        headers.LastModified = image.lastModified;
        response.Headers[HeaderNames.Vary] = "Accept";
        response.Headers[HeaderNames.ETag] = image.eTag;
    }

    private static bool IsNotModified(HttpContext context, PizzaImageDefinition image)
        => (context.Request.Headers.TryGetValue(HeaderNames.IfNoneMatch, out var etags) &&
            etags.Any(tag => string.Equals(tag.Trim(), image.eTag, StringComparison.OrdinalIgnoreCase))) || (context.Request.Headers.TryGetValue(HeaderNames.IfModifiedSince, out var modifiedSince) &&
            DateTimeOffset.TryParse(modifiedSince, out var since) &&
            since.ToUniversalTime() >= image.lastModified.ToUniversalTime());
}
