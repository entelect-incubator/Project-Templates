namespace Application.Pizzas.V1.Commands;

public class DeletePizzaCommand : ICommand<Result>
{
    public required int Id { get; set; }
}

public class DeletePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<DeletePizzaCommand, Result>
{
    public async Task<Result> Handle(DeletePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var entity = await databaseContext.Pizzas.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (entity is null)
        {
            return Result.NotFound(PizzaErrors.Delete);
        }

        databaseContext.Pizzas.Remove(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult.Outcome(outcome);
    }
}