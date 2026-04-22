namespace Api.Endpoints.V1.Pizzas;

using Core.Pizzas.V1.Models;
using Core.Pizzas.V1.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

public class SearchPizzaEndpoint(Dispatcher dispatcher) : IEndpoint
{
    public async Task<IResult> Search(GetAllPizzasQuery query, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Query(query, cancellationToken));
}

public static class SearchPizzaEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}/Search", (SearchPizzaEndpoint ep, [FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)] GetAllPizzasQuery? query, CancellationToken cancellationToken)
            => ep.Search(query ?? new GetAllPizzasQuery(), cancellationToken))
                .WithOrder(100)
                .WithTags(Config.TAG)
                .WithName("Search for pizzas")
                .Produces<Result<IEnumerable<PizzaModel>>>(StatusCodes.Status200OK, "application/json")
                .WithStandardErrors()
                .AddOpenApiOperationTransformer((operation, context, ct) =>
                {
                    operation.Summary = "Search Pizza";
                    operation.Description = "Search for pizzas";
                    return Task.CompletedTask;
                });
}