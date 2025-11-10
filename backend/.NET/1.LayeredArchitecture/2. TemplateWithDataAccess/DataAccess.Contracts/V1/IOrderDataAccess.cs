namespace DataAccess.Contracts.V1;

using Common.V1.Orders.Models;

public interface IOrderDataAccess
{
    Task<Result<OrderModel>> Complete(int id, CancellationToken cancellationToken = default);

    Task<Result<OrderStatus>> GetStatus(int id, CancellationToken cancellationToken = default);

    Task<Result<OrderModel>> Create(CreateOrderModel model, CancellationToken cancellationToken = default);
}