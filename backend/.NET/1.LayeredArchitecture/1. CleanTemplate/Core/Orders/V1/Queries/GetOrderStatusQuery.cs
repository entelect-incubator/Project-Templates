namespace Core.Orders.V1.Queries;

using Common.V1.Orders.Models;

public sealed class GetOrderStatusQuery : IQuery<Result<OrderStatus>>
{
    public required int Id { get; set; }
}

public sealed class GetOrderStatusQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>
{
    public async Task<Result<OrderStatus>> Handle(GetOrderStatusQuery request, CancellationToken cancellationToken = default)
    {
        var entity = await databaseContext.Orders.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity is null)
        {
            return Result<OrderStatus>.NotFound($"Order with ID {request.Id} was not found");
        }

        // Convert from entity enum to model enum
        var modelStatus = (OrderStatus)(int)entity.Status;
        return Result<OrderStatus>.Success(modelStatus);
    }
}