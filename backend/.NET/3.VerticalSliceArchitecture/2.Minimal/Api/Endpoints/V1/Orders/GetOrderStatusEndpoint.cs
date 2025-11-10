namespace Api.Endpoints.V1.Orders;

using Core.Orders.V1.Queries;
using Core.Orders.V1.Models;
using Api.Endpoints;

public class GetOrderStatusEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> GetStatus(GetOrderStatusQuery query, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Query(query, cancellationToken));
}

public static class GetOrderStatusEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapGet($"{Config.ENDPOINT}order/status/{{id}}", (GetOrderStatusEndpoint ep, int id, CancellationToken cancellationToken) => ep.GetStatus(new GetOrderStatusQuery { Id = id }, cancellationToken))
            .WithTags("Orders")
            .WithName("Get order status")
            .Produces<Result<OrderStatus>>(StatusCodes.Status200OK, "application/json")
            .WithStandardErrors()
            .WithOpenApi(op =>
            {
                op.OperationId = "GetOrderStatus";
                op.Summary = "Get the status of an order";
                return op;
            });
}