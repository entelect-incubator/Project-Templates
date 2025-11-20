namespace Core.Pizzas.V1.Commands;

public sealed class DeletePizzaCommand : ICommand<Result>
{
    public required int Id { get; set; }
}

public sealed class DeletePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<DeletePizzaCommand, Result>
{
    public async Task<Result> Handle(DeletePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var query = EF.CompileAsyncQuery((DatabaseContext db, int id) => db.Pizzas.FirstOrDefault(c => c.Id == id));
        var findEntity = await query(databaseContext, request.Id);
        if (findEntity is null)
        {
            return Result.NotFound();
        }

        databaseContext.Pizzas.Remove(findEntity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult.Outcome(outcome);
    }
}