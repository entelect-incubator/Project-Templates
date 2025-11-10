namespace Application.Pizzas.V1.Queries;

using Application.Pizzas.V1.Filters;
using Application.Pizzas.V1.Mappers;
using Domain.V1.Pizzas.Models;
using Utilities.Extensions;
using Utilities.Models;

public class GetAllPizzasQuery : BaseSearchModel, IQuery<Result<IEnumerable<PizzaModel>>>
{
    public string? Name { get; set; }

    public DateTimeOffset? DateCreated { get; set; }

    public bool? Disabled { get; set; }
}

public class GetAllPizzasQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>
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