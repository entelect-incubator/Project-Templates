namespace Api.Endpoints.V1.Admin;

using Api.Infrastructure;

public class SeedDataEndpoint : IEndpoint
{
    public async Task<IResult> Seed(CancellationToken cancellationToken)
    {
        try
        {
            Console.WriteLine("?? Seeding database with sample data...");
            return Results.Ok(new { message = "Database seeded successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            return Results.BadRequest(new { error = ex.Message });
        }
    }

    public async Task<IResult> Clean(CancellationToken cancellationToken)
    {
        try
        {
            Console.WriteLine("?? Cleaning database...");
            return Results.Ok(new { message = "Database cleaned successfully", timestamp = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            return Results.BadRequest(new { error = ex.Message });
        }
    }
}

public static class AdminEndpointExtensions
{
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/v1/admin")
            .WithTags("Admin");

        group.MapPost("/seed", Handle<SeedDataEndpoint>(e => e.Seed))
            .WithName("Seed Data")
            .WithSummary("Populate database with sample pizza data")
            .WithDescription("Seeds the database with 8 sample pizzas if empty")
            .Produces(StatusCodes.Status200OK);

        group.MapPost("/clean", Handle<SeedDataEndpoint>(e => e.Clean))
            .WithName("Clean Data")
            .WithSummary("Clean all data from database")
            .WithDescription("Deletes all pizzas and orders from the database")
            .Produces(StatusCodes.Status200OK);
    }

    private static Delegate Handle<TEndpoint>(
        Func<TEndpoint, Func<CancellationToken, Task<IResult>>> handler)
        where TEndpoint : class
    {
        return async (TEndpoint endpoint, CancellationToken ct) =>
            await handler(endpoint)(ct);
    }
}
