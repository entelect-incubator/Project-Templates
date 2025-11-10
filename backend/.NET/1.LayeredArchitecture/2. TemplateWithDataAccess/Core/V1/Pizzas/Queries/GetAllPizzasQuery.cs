namespace Core.V1.Pizzas.Queries;

using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;

public class GetAllPizzasQuery : IQuery<Result<IEnumerable<PizzaModel>>>
{
    public required PizzaSearchModel Model { get; set; }
}

public class GetAllPizzasQueryHandler(IPizzaDataAccess dataAccess) : IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>
{
    public async Task<Result<IEnumerable<PizzaModel>>> Handle(GetAllPizzasQuery request, CancellationToken cancellationToken = default)
        => await dataAccess.Search(request.Model, cancellationToken);
}