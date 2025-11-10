namespace Application.Orders.V1.Commands;

using Application.Orders.V1;
using Application.Orders.V1.Mappers;
using Domain.V1.Orders.Models;

public sealed class CompleteOrderCommand : ICommand<Result<OrderModel>>
{
    public required int Id { get; set; }
}

public sealed class CompleteOrderCommandHandler(DatabaseContext databaseContext) : ICommandHandler<CompleteOrderCommand, Result<OrderModel>>
{
    public async Task<Result<OrderModel>> Handle(CompleteOrderCommand request, CancellationToken cancellationToken = default)
    {
        var entity = await CompiledQueries.Get(databaseContext, request.Id);
        if (entity is null)
        {
            return Result<OrderModel>.NotFound($"Order with ID {request.Id} was not found");
        }

        entity.Status = Domain.V1.Orders.OrderStatus.Complete;
        databaseContext.Orders.Update(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<OrderModel>.Outcome(entity.Map(), outcome);
    }
}