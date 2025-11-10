namespace Features.Orders.V1.Commands;

using Features.Orders.V1.Entities;
using Features.Orders.V1.Mappers;
using Features.Orders.V1.Models;
using OrderStatus = Entities.OrderStatus;

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
            Status = OrderStatus.Confirmed,
            DateCreated = DateTimeOffset.UtcNow
        };

        databaseContext.Orders.Add(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<OrderModel>.Outcome(OrderMapper.Map(entity), outcome);
    }
}