namespace DataAccess.V1.Orders;

using Common.V1.Orders;
using Common.V1.Orders.Models;
using DataAccess.Contracts.V1;
using OrderStatus = Common.V1.Orders.Models.OrderStatus;

public class OrderDataAccess(DatabaseContext databaseContext) : BaseDataAccess<DatabaseContext>(databaseContext), IOrderDataAccess
{
    public async Task<Result<OrderModel>> Complete(int id, CancellationToken cancellationToken = default)
    {
        var entity = await CompiledQueries.Get(this.DatabaseContext, id);
        if (entity is null)
        {
            return Result<OrderModel>.NotFound($"Order with ID {id} was not found");
        }

        entity.Status = Common.V1.Orders.OrderStatus.Complete;
        databaseContext.Orders.Update(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<OrderModel>.Outcome(entity.Map(), outcome);
    }

    public async Task<Result<OrderStatus>> GetStatus(int id, CancellationToken cancellationToken = default)
    {
        var entity = await databaseContext.Orders.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (entity is null)
        {
            return Result<OrderStatus>.NotFound($"Order with ID {id} was not found");
        }

        var modelStatus = (OrderStatus)(int)entity.Status;
        return Result<OrderStatus>.Success(modelStatus);
    }

    public async Task<Result<OrderModel>> Create(CreateOrderModel model, CancellationToken cancellationToken = default)
    {
        var entity = new Order()
        {
            CustomerName = model.CustomerName,
            CustomerEmail = model.CustomerEmail,
            PizzaId = model.PizzaId,
            Status = (Common.V1.Orders.OrderStatus)OrderStatus.Confirmed,
            DateCreated = DateTimeOffset.UtcNow
        };

        databaseContext.Orders.Add(entity);
        var outcome = await databaseContext.SaveChangesAsync(cancellationToken);

        return ProcessEFResult<OrderModel>.Outcome(OrderMapper.Map(entity), outcome);
    }
}
