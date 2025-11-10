namespace Core.V1.Pizzas.Commands;

using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;

public class CreatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public required CreatePizzaModel Model { get; set; }
}

public class CreatePizzaCommandHandler(IPizzaDataAccess dataAccess) : ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(CreatePizzaCommand request, CancellationToken cancellationToken = default)
        => await dataAccess.Save(request.Model, cancellationToken);
}