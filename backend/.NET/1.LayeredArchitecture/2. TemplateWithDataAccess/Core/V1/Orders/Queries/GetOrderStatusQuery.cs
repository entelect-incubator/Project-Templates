namespace Core.V1.Orders.Queries;

using Common.V1.Orders.Models;
using DataAccess.Contracts.V1;

public sealed class GetOrderStatusQuery : IQuery<Result<OrderStatus>>
{
    public required int Id { get; set; }
}

public sealed class GetOrderStatusQueryHandler(IOrderDataAccess dataAccess) : IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>
{
    public async Task<Result<OrderStatus>> Handle(GetOrderStatusQuery request, CancellationToken cancellationToken = default)
        => await dataAccess.GetStatus(request.Id, cancellationToken);
}