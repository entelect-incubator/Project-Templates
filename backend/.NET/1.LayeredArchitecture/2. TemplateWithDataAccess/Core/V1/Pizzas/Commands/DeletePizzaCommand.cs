namespace Core.V1.Pizzas.Commands;

using DataAccess.Contracts.V1;

public sealed class DeletePizzaCommand : ICommand<Result>
{
    public required int Id { get; set; }
}

public sealed class DeletePizzaCommandHandler(IPizzaDataAccess dataAccess) : ICommandHandler<DeletePizzaCommand, Result>
{
    public async Task<Result> Handle(DeletePizzaCommand request, CancellationToken cancellationToken = default)
        => await dataAccess.Delete(request.Id, cancellationToken);
}