namespace Common.V1.Orders;

public sealed class Order
{
    public int Id { get; set; }

    public required string CustomerName { get; set; }

    public required string CustomerEmail { get; set; }

    public required int PizzaId { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.Confirmed;

    public DateTimeOffset DateCreated { get; set; } = DateTimeOffset.UtcNow;
}

public enum OrderStatus
{
    Confirmed,
    Making,
    Complete,
    SentOutForDelivery
}