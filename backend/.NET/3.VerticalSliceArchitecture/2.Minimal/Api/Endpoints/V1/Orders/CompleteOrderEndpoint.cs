namespace Api.Endpoints.V1.Orders;

using Core.Orders.V1.Commands;
using Core.Orders.V1.Models;

public class CompleteOrderEndpoint(Dispatcher dispatcher) : IEndpoint
{
    public async Task<IResult> Complete(CompleteOrderCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class CompleteOrderEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}order/complete", async ([FromServices] Dispatcher dispatcher, CompleteOrderCommand command, CancellationToken ct)
            => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, ct)))
                .WithOrder(220)
                .WithTags("Orders")
                .WithName("Complete order")
                .Produces<Result<OrderModel>>(StatusCodes.Status200OK, "application/json")
                .WithStandardErrors()
                .AddOpenApiOperationTransformer((operation, context, ct) =>
                {
                    operation.Summary = "Complete Order";
                    operation.Description = "Complete an order";
                    return Task.CompletedTask;
                });
}