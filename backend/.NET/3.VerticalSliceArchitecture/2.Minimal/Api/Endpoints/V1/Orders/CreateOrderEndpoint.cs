namespace Api.Endpoints.V1.Orders;

using Core.Orders.V1.Commands;
using Core.Orders.V1.Models;

public class CreateOrderEndpoint(Dispatcher dispatcher)
{
    public async Task<IResult> Create(CreateOrderCommand command, CancellationToken cancellationToken)
        => ApiMinimalResultHelper.Outcome(await dispatcher.Send(command, cancellationToken));
}

public static class CreateOrderEndpointExtensions
{
    public static void MapEndpoints(this IEndpointRouteBuilder app)
        => app.MapPost($"{Config.ENDPOINT}order", (CreateOrderEndpoint ep, CreateOrderCommand command, CancellationToken cancellationToken)
            => ep.Create(command, cancellationToken))
                .WithOrder(200)
                .WithTags("Orders")
                .WithName("Create order")
                .Produces<Result<OrderModel>>(StatusCodes.Status200OK, "application/json")
                .WithStandardErrors()
                .AddOpenApiOperationTransformer((operation, context, ct) =>
                {
                    operation.Summary = "Create Order";
                    operation.Description = "Create a new order";
                    return Task.CompletedTask;
                });
}