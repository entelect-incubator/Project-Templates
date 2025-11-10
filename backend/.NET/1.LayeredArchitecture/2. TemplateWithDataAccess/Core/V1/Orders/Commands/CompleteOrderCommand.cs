namespace Core.V1.Orders.Commands;

using Common.V1.Orders.Models;
using DataAccess.Contracts.V1;

public sealed class CompleteOrderCommand : ICommand<Result<OrderModel>>
{
    public required int Id { get; set; }
}

public sealed class CompleteOrderCommandHandler(IOrderDataAccess dataAccess) : ICommandHandler<CompleteOrderCommand, Result<OrderModel>>
{
    public async Task<Result<OrderModel>> Handle(CompleteOrderCommand request, CancellationToken cancellationToken = default)
        => await dataAccess.Complete(request.Id, cancellationToken);
}