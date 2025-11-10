namespace Application.Pizzas.V1.Commands;

using Application.Pizzas.V1.Mappers;
using Domain.V1.Pizzas;
using Domain.V1.Pizzas.Models;

public class CreatePizzaCommand : ICommand<Result<PizzaModel>>
{
    public string Name { get; set; }

    [DefaultValue(false)]
    public bool Disabled { get; set; } = false;
}

public class CreatePizzaCommandHandler(DatabaseContext databaseContext) : ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>
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