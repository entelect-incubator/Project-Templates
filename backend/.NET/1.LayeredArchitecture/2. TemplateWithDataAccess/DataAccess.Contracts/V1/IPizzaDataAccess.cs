namespace DataAccess.Contracts.V1;

using Common.V1.Pizzas.Models;

public interface IPizzaDataAccess
{
    Task<Result<PizzaModel>> Get(int id, CancellationToken cancellationToken = default);

    Task<Result<IEnumerable<PizzaModel>>> Search(PizzaSearchModel model, CancellationToken cancellationToken = default);

    Task<Result<PizzaModel>> Save(CreatePizzaModel model, CancellationToken cancellationToken = default);

    Task<Result<PizzaModel>> Update(int id, UpdatePizzaModel model, CancellationToken cancellationToken = default);

    Task<Result> Delete(int id, CancellationToken cancellationToken = default);
}