namespace Core.Orders.V1.Queries;

using Core;
using Core.Orders.V1.Mappers;
using Core.Orders.V1.Models;

[BindProperties]
public sealed class GetAllOrdersQuery : BaseSearchModel, IQuery<Result<IEnumerable<OrderModel>>>
{
    public string? Name { get; set; }
}

public sealed class GetAllOrdersQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetAllOrdersQuery, Result<IEnumerable<OrderModel>>>
{
    public async Task<Result<IEnumerable<OrderModel>>> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken = default)
    {
        var entities = databaseContext.Orders.Select(x => x).AsNoTracking();

        var count = await entities.CountAsync(cancellationToken);
        var paged = await entities.ApplyPaging(request.PagingArgs).ToListAsync(cancellationToken);
        return Result<IEnumerable<OrderModel>>.Success(OrderMapper.Map(paged), count);
    }
}