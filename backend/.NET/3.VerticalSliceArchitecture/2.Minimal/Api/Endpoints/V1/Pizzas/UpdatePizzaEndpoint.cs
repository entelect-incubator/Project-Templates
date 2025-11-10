namespace Api.Endpoints.V1.Pizzas;

using Api.Endpoints;

using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Models;

public class UpdatePizzaEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> Update(UpdatePizzaCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class UpdatePizzaEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPut($"{Config.ENDPOINT}", (UpdatePizzaEndpoint ep, UpdatePizzaCommand command, CancellationToken cancellationToken) => ep.Update(command, cancellationToken))
            .WithTags(Config.TAG)
            .WithName("Update pizza")
            .Produces<Result<PizzaModel>>(StatusCodes.Status200OK, "application/json")
            .WithNotFoundAndErrors()
            .WithOpenApi(op =>
            {
                op.OperationId = "UpdatePizza";
                op.Summary = "Update existing pizza";
                return op;
            });
}