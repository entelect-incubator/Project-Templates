namespace Api.Endpoints.V1.Pizzas;

using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Models;

public class UpdatePizzaEndpoint(Dispatcher dispatcher) : IEndpoint
{
    public async Task<IResult> Update(UpdatePizzaCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class UpdatePizzaEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPut($"{Config.ENDPOINT}", (UpdatePizzaEndpoint ep, UpdatePizzaCommand command, CancellationToken cancellationToken)
            => ep.Update(command, cancellationToken))
                .WithOrder(120)
                .WithTags(Config.TAG)
                .WithName("Update pizza")
                .Produces<Result<PizzaModel>>(StatusCodes.Status200OK, "application/json")
                .WithNotFoundAndErrors()
                .AddOpenApiOperationTransformer((operation, context, ct) =>
                {
                    operation.Summary = "Update Pizza";
                    operation.Description = "Update existing pizza";
                    return Task.CompletedTask;
                });
}