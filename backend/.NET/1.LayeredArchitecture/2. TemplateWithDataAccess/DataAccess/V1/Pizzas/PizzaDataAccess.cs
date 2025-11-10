namespace DataAccess.V1.Pizzas;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;

public class PizzaDataAccess(DatabaseContext databaseContext) : BaseDataAccess<DatabaseContext>(databaseContext), IPizzaDataAccess
{
    public async Task<Result<PizzaModel>> Get(int id, CancellationToken cancellationToken = default)
    {
        var result = await CompiledQueries.Get(this.DatabaseContext, id);
        return result == null ? Result<PizzaModel>.NotFound(PizzaErrors.NotFound) : Result<PizzaModel>.Success(result.Map());
    }

    public async Task<Result<IEnumerable<PizzaModel>>> Search(PizzaSearchModel model, CancellationToken cancellationToken = default)
    {
        var entities = this.DatabaseContext.Pizzas.Select(x => x)
          .AsNoTracking()
          .FilterByName(model?.Name)
          .FilterByDisabled(model?.Disabled);

        var count = await entities.CountAsync(cancellationToken);
        var paged = await entities.ApplyPaging(model.PagingArgs).ToListAsync(cancellationToken);
        return Result<IEnumerable<PizzaModel>>.Success(paged.Map(), count);
    }

    public async Task<Result<PizzaModel>> Save(CreatePizzaModel model, CancellationToken cancellationToken = default)
    {
        var entity = model.MapCreate();
        entity.DateCreated = DateTime.UtcNow;

        this.DatabaseContext.Pizzas.Add(entity);
        var outcome = await this.DatabaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(entity.Map(), outcome);
    }

    public async Task<Result<PizzaModel>> Update(int id, UpdatePizzaModel model, CancellationToken cancellationToken = default)
    {
        var findEntity = await this.DatabaseContext.Pizzas.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (findEntity is null)
        {
            return Result<PizzaModel>.NotFound(PizzaErrors.Update);
        }

        if (!string.IsNullOrEmpty(model.Name))
        {
            findEntity.Name = model.Name;
        }

        if (model.Disabled.HasValue)
        {
            findEntity.Disabled = model.Disabled.Value;
        }

        this.DatabaseContext.Pizzas.Update(findEntity);
        var outcome = await this.DatabaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(findEntity.Map(), outcome);
    }

    public async Task<Result> Delete(int id, CancellationToken cancellationToken = default)
    {
        var entity = await this.DatabaseContext.Pizzas.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (entity is null)
        {
            return Result.NotFound(PizzaErrors.Delete);
        }

        this.DatabaseContext.Pizzas.Remove(entity);
        var outcome = await this.DatabaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult.Outcome(outcome);
    }
}
