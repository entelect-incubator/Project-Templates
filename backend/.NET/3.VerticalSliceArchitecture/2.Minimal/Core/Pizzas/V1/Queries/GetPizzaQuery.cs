namespace Core.Pizzas.V1.Queries;

using Common.Enums;
using Core.Pizzas.V1.Mappers;
using Core.Pizzas.V1.Models;

public sealed class GetPizzaQuery : IQuery<Result<PizzaModel>>
{
    public required int Id { get; set; }
}

public sealed class GetPizzaQueryHandler(DatabaseContext databaseContext) : IQueryHandler<GetPizzaQuery, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(GetPizzaQuery request, CancellationToken cancellationToken = default)
    {
        var result = await CompiledQueries.Get(databaseContext, request.Id);
        return result == null ? Result<PizzaModel>.NotFound(PizzaErrors.NotFound) : Result<PizzaModel>.Success(result.Map());
    }
}