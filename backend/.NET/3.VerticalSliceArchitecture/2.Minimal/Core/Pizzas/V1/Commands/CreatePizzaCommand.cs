namespace Core.Pizzas.V1.Commands;

using Core.Pizzas.V1.Database.Entities;
using Core.Pizzas.V1.Mappers;
using Core.Pizzas.V1.Models;

public sealed class CreatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public required string Name { get; set; }
}

public sealed class CreatePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(CreatePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var entity = new Pizza()
        {
            Name = request.Name,
            Disabled = false,
            DateCreated = DateTime.UtcNow
        };
        databaseContext.Pizzas.Add(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(entity.Map(), outcome);
    }
}