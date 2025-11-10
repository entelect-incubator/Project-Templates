namespace Api.Endpoints.V1.Orders;

using Api.Endpoints;

using Core.Orders.V1.Commands;
using Core.Orders.V1.Models;

public class CompleteOrderEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> Complete(CompleteOrderCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class CompleteOrderEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}order/complete", (CompleteOrderEndpoint ep, CompleteOrderCommand command, CancellationToken cancellationToken) => ep.Complete(command, cancellationToken))
            .WithTags("Orders")
            .WithName("Complete order")
            .Produces<Result<OrderModel>>(StatusCodes.Status200OK, "application/json")
            .WithStandardErrors()
            .WithOpenApi(op =>
            {
                op.OperationId = "CompleteOrder";
                op.Summary = "Complete an order";
                return op;
            });
}