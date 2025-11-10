namespace Core.V1.Pizzas.Queries;

using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;

public class GetPizzaQuery : IQuery<Result<PizzaModel>>
{
    public required int Id { get; set; }
}

public class GetPizzaQueryHandler(IPizzaDataAccess dataAccess) : IQueryHandler<GetPizzaQuery, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(GetPizzaQuery request, CancellationToken cancellationToken = default)
        => await dataAccess.Get(request.Id, cancellationToken);
}