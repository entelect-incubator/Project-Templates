namespace Application.Pizzas.V1.Queries;

using Application.Pizzas.V1.Mappers;
using Domain.V1.Pizzas;
using Domain.V1.Pizzas.Models;

public class GetPizzaQuery : IQuery<Result<PizzaModel>>
{
    public required int Id { get; set; }
}

public class GetPizzaQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetPizzaQuery, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(GetPizzaQuery request, CancellationToken cancellationToken = default)
    {
        var result = await CompiledQueries.Get(databaseContext, request.Id);
        return result == null ? Result<PizzaModel>.NotFound(PizzaErrors.NotFound) : Result<PizzaModel>.Success(result.Map());
    }
}