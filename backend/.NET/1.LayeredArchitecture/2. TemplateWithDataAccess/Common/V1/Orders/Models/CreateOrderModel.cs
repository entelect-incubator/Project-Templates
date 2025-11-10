namespace Common.V1.Orders.Models;

public sealed class CreateOrderModel
{
    public required string CustomerName { get; set; }

    public required string CustomerEmail { get; set; }

    public required int PizzaId { get; set; }
}