namespace Core.V1.Pizzas.Commands;

using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;

public class UpdatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public required int Id { get; set; }

    public required UpdatePizzaModel Model { get; set; }
}

public class UpdatePizzaCommandHandler(IPizzaDataAccess dataAccess) : ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(UpdatePizzaCommand request, CancellationToken cancellationToken = default)
        => await dataAccess.Update(request.Id, request.Model, cancellationToken);
}