namespace Core.Pizzas.V1.Queries;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;
using Core.Pizzas.V1.Filters;

public sealed class GetAllPizzasQuery : BaseSearchModel, IQuery<Result<IEnumerable<PizzaModel>>>
{
    public string? Name { get; set; }

    public DateTimeOffset? DateCreated { get; set; }

    public bool? Disabled { get; set; }
}

public sealed class GetAllPizzasQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>
{
    public async Task<Result<IEnumerable<PizzaModel>>> Handle(GetAllPizzasQuery request, CancellationToken cancellationToken = default)
    {
        var entities = databaseContext.Pizzas.Select(x => x)
          .AsNoTracking()
          .FilterByName(request?.Name)
          .FilterByDisabled(request?.Disabled);

        var count = await entities.CountAsync(cancellationToken);
        var paged = await entities.ApplyPaging(request.PagingArgs).ToListAsync(cancellationToken);
        return Result<IEnumerable<PizzaModel>>.Success(paged.Map(), count);
    }
}