namespace Core.Orders.V1.Database.Entities;

using Core.Orders.V1.Models;

public class Order
{
    public int Id { get; set; }

    public required string CustomerName { get; set; }

    public required string CustomerEmail { get; set; }

    public required int PizzaId { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Confirmed;

    public DateTimeOffset DateCreated { get; set; }
}