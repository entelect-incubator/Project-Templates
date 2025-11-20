namespace Api.Endpoints.V1.Pizzas;

using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Models;

public class CreatePizzaEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> Create(CreatePizzaCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class CreatePizzaEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}", (CreatePizzaEndpoint ep, CreatePizzaCommand command, CancellationToken cancellationToken)
            => ep.Create(command, cancellationToken))
                .WithOrder(110)
                .WithTags(Config.TAG)
                .WithName("Create a pizza")
                .Produces<Result<PizzaModel>>(StatusCodes.Status200OK, "application/json")
                .WithStandardErrors()
                .AddOpenApiOperationTransformer((operation, context, ct) =>
                {
                    operation.Summary = "Create Pizza";
                    operation.Description = "Create a new pizza";
                    return Task.CompletedTask;
                });
}