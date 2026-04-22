namespace Core.Pizzas.V1.Commands;

using Core.Pizzas.V1.Mappers;
using Core.Pizzas.V1.Models;
using Microsoft.EntityFrameworkCore;

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
        var findEntity = await databaseContext.Pizzas.FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);
        if (findEntity is null)
        {
            return Result<PizzaModel>.NotFound();
        }

        ActionHelper.UpdateIf(() => findEntity.Name = model.Name, model?.Name);
        ActionHelper.UpdateIf(() => findEntity.Disabled = model.Disabled!.Value, model?.Disabled);

        databaseContext.Pizzas.Update(findEntity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(findEntity.Map(), outcome);
    }
}