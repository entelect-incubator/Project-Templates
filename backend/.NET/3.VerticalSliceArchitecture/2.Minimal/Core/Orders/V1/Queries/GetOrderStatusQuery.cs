namespace Core.Orders.V1.Queries;

using Core.Orders.V1.Models;

public sealed class GetOrderStatusQuery : IQuery<Result<OrderStatus>>
{
    public required int Id { get; set; }
}

public sealed class GetOrderStatusQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>
{
    public async Task<Result<OrderStatus>> Handle(GetOrderStatusQuery request, CancellationToken cancellationToken = default)
    {
        var entity = await CompiledQueries.Get(databaseContext, request.Id);
        return entity is null ? Result<OrderStatus>.NotFound() : Result<OrderStatus>.Success(entity.Status);
    }
}