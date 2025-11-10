namespace Application.Pizzas.V1.Commands;

using Application.Pizzas.V1.Mappers;
using Domain.V1.Pizzas.Models;

public class UpdatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public int Id { get; set; }

    public UpdatePizzaModel Model { get; set; }
}

public class UpdatePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(UpdatePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var model = request.Model;
        var findEntity = await databaseContext.Pizzas.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (findEntity is null)
        {
            return Result<PizzaModel>.NotFound(PizzaErrors.Update);
        }

        findEntity.Name = !string.IsNullOrEmpty(model.Name) ? model.Name : findEntity.Name;
        findEntity.Disabled = model.Disabled ?? findEntity.Disabled;

        databaseContext.Pizzas.Update(findEntity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(findEntity.Map(), outcome);
    }
}