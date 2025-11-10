namespace Core.Pizzas.V1.Commands;

using Common.V1.Orders;
using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;

public sealed class CreatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public required string Name { get; set; }

    [DefaultValue(false)]
    public required bool Disabled { get; set; } = false;
}

public sealed class CreatePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>
{
    public async Task<Result<PizzaModel>> Handle(CreatePizzaCommand request, CancellationToken cancellationToken = default)
    {
        var entity = new Pizza()
        {
            Name = request?.Name,
            Disabled = request?.Disabled,
            DateCreated = DateTime.UtcNow
        };
        databaseContext.Pizzas.Add(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<PizzaModel>.Outcome(entity.Map(), outcome);
    }
}