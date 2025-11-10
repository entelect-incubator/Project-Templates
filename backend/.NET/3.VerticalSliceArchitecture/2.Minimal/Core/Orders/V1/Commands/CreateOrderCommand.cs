namespace Core.Orders.V1.Commands;

using Core;
using Core.Orders.V1.Database.Entities;
using Core.Orders.V1.Mappers;
using Core.Orders.V1.Models;
using Core.Pizzas.V1.Mappers;

public sealed class CreateOrderCommand : ICommand<Result<OrderModel>>
{
    public required string CustomerName { get; set; }

    public required string CustomerEmail { get; set; }

    public required int PizzaId { get; set; }
}

public sealed class CreateOrderCommandHandler(DatabaseContext databaseContext) : ICommandHandler<CreateOrderCommand, Result<OrderModel>>
{
    public async Task<Result<OrderModel>> Handle(CreateOrderCommand request, CancellationToken cancellationToken = default)
    {
        var entity = new Order()
        {
            CustomerName = request.CustomerName,
            CustomerEmail = request.CustomerEmail,
            PizzaId = request.PizzaId,
            DateCreated = DateTime.UtcNow
        };
        databaseContext.Orders.Add(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<OrderModel>.Outcome(OrderMapper.Map(entity), outcome);
    }
}