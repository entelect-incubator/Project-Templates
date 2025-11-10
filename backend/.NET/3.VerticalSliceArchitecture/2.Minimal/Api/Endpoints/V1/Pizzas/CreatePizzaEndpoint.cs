namespace Api.Endpoints.V1.Pizzas;

using Api.Endpoints;

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
        => app.MapPost($"{Config.ENDPOINT}", (CreatePizzaEndpoint ep, CreatePizzaCommand command, CancellationToken cancellationToken) => ep.Create(command, cancellationToken))
            .WithTags(Config.TAG)
            .WithName("Create a pizza")
            .Produces<Result<PizzaModel>>(StatusCodes.Status200OK, "application/json")
            .WithStandardErrors()
            .WithOpenApi(op =>
            {
                op.OperationId = "CreatePizza";
                op.Summary = "Create a new pizza";
                return op;
            });
}