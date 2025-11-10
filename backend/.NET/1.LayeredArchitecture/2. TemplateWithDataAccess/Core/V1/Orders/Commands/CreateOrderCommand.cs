namespace Core.V1.Orders.Commands;

using Common.V1.Orders.Models;
using DataAccess.Contracts.V1;

public sealed class CreateOrderCommand : ICommand<Result<OrderModel>>
{
    public required CreateOrderModel Model { get; set; }
}

public sealed class CreateOrderCommandHandler(IOrderDataAccess dataAccess) : ICommandHandler<CreateOrderCommand, Result<OrderModel>>
{
    public async Task<Result<OrderModel>> Handle(CreateOrderCommand request, CancellationToken cancellationToken = default)
        => await dataAccess.Create(request.Model, cancellationToken);
}