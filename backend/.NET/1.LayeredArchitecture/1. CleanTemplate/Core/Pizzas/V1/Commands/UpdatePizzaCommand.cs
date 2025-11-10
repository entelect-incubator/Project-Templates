namespace Core.Pizzas.V1.Commands;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;

public sealed class UpdatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public required int Id { get; set; }

    public required UpdatePizzaModel Model { get; set; }
}

public sealed class UpdatePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(UpdatePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var model = request.Model;
        var findEntity = await CompiledQueries.Get(databaseContext, request.Id);
        if (findEntity is null)
        {
            return Result<PizzaModel>.NotFound(PizzaErrors.Update);
        }

        findEntity.Name = (!string.IsNullOrEmpty(model.Name)) ? model.Name : findEntity.Name;
        findEntity.Disabled = model.Disabled ?? findEntity.Disabled;

        databaseContext.Pizzas.Update(findEntity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(findEntity.Map(), outcome);
    }
}