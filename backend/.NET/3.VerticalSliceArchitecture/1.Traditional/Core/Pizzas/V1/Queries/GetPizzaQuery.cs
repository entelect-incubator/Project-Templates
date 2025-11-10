namespace Features.Pizzas.V1.Queries;

using Features;
using Features.Pizzas.Errors;
using Features.Pizzas.V1.Mappers;
using Features.Pizzas.V1.Models;

public sealed class GetPizzaQuery : IQuery<Result<PizzaModel>>
{
    public int Id { get; set; }
}

public sealed class GetPizzaQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetPizzaQuery, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(GetPizzaQuery request, CancellationToken cancellationToken = default)
    {
        var result = await CompiledQueries.Get(databaseContext, request.Id);
        return result == null ? Result<PizzaModel>.NotFound(PizzaErrors.NotFound) : Result<PizzaModel>.Success(result.Map());
    }
}