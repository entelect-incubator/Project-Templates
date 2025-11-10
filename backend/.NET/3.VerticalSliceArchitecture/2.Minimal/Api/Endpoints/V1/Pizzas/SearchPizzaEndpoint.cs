namespace Api.Endpoints.V1.Pizzas;

using Api.Endpoints;

using Core.Pizzas.V1.Models;
using Core.Pizzas.V1.Queries;

public class SearchPizzaEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> Search(GetAllPizzasQuery query, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Query(query, cancellationToken));
}

public static class SearchPizzaEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}search", (SearchPizzaEndpoint ep, GetAllPizzasQuery query, CancellationToken cancellationToken) => ep.Search(query, cancellationToken))
            .WithTags(Config.TAG)
            .WithName("Search for pizzas")
            .Produces<Result<IEnumerable<PizzaModel>>>(StatusCodes.Status200OK, "application/json")
            .WithStandardErrors()
            .WithOpenApi(op =>
            {
                op.OperationId = "SearchPizzas";
                op.Summary = "Search for pizzas";
                return op;
            });
}