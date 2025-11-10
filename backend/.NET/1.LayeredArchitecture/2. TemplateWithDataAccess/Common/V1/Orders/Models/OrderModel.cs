namespace Common.V1.Orders.Models;

public sealed class OrderModel
{
    public int Id { get; set; }

    public required string CustomerName { get; set; }

    public required string CustomerEmail { get; set; }

    public required int PizzaId { get; set; }

    public required OrderStatus Status { get; set; }
}