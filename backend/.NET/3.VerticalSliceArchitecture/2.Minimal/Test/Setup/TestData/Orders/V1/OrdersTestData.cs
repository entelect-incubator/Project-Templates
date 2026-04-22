namespace Test.Setup.TestData.Orders.V1;

using Core.Orders.V1.Database.Entities;
using Core.Orders.V1.Models;

/// <summary>
/// Object Mother pattern for Order entity test data generation.
/// Provides factory methods to create Order entities with various configurations.
/// Uses Bogus library for realistic random data generation.
/// </summary>
public static class OrderTestDataMother
{
    private static readonly Faker<Order> OrderFaker = new Faker<Order>()
        .RuleFor(o => o.Id, f => f.UniqueIndex + 1)
        .RuleFor(o => o.CustomerName, f => f.Person.FullName)
        .RuleFor(o => o.CustomerEmail, f => f.Internet.Email())
        .RuleFor(o => o.PizzaId, f => f.Random.Int(1, 100))
        .RuleFor(o => o.Status, f => f.PickRandom<OrderStatus>())
        .RuleFor(o => o.DateCreated, f => f.Date.PastOffset());

    private static readonly Faker<OrderModel> OrderModelFaker = new Faker<OrderModel>()
        .RuleFor(o => o.Id, f => f.UniqueIndex + 1)
        .RuleFor(o => o.CustomerName, f => f.Person.FullName)
        .RuleFor(o => o.CustomerEmail, f => f.Internet.Email())
        .RuleFor(o => o.PizzaId, f => f.Random.Int(1, 100))
        .RuleFor(o => o.Status, f => f.PickRandom<OrderStatus>())
        .RuleFor(o => o.DateCreated, f => f.Date.PastOffset());

    public static Order CreateOrder() =>
        OrderFaker.Generate();

    public static List<Order> CreateOrders(int count = 5) =>
        OrderFaker.Generate(count);

    public static Order CreateOrderWithStatus(OrderStatus status) =>
        OrderFaker.RuleFor(o => o.Status, status).Generate();

    public static Order CreateOrderForPizza(int pizzaId) =>
        OrderFaker.RuleFor(o => o.PizzaId, pizzaId).Generate();

    public static List<Order> CreateConfirmedOrders(int count = 3) =>
        OrderFaker.RuleFor(o => o.Status, OrderStatus.Confirmed).Generate(count);

    public static List<Order> CreateCompleteOrders(int count = 3) =>
        OrderFaker.RuleFor(o => o.Status, OrderStatus.Complete).Generate(count);

    public static List<Order> CreateMakingOrders(int count = 3) =>
        OrderFaker.RuleFor(o => o.Status, OrderStatus.Making).Generate(count);

    public static List<Order> CreateDeliveryOrders(int count = 3) =>
        OrderFaker.RuleFor(o => o.Status, OrderStatus.SentOutForDelivery).Generate(count);

    public static Order CreateOrderWithCustomerName(string customerName) =>
        OrderFaker.RuleFor(o => o.CustomerName, customerName).Generate();

    public static Order CreateOrderWithCustomerEmail(string customerEmail) =>
        OrderFaker.RuleFor(o => o.CustomerEmail, customerEmail).Generate();

    public static OrderModel CreateOrderModel() =>
        OrderModelFaker.Generate();

    public static List<OrderModel> CreateOrderModels(int count = 5) =>
        OrderModelFaker.Generate(count);

    public static OrderModel CreateOrderModelWithStatus(OrderStatus status) =>
        OrderModelFaker.RuleFor(o => o.Status, status).Generate();

    public static OrderModel CreateOrderModelForPizza(int pizzaId) =>
        OrderModelFaker.RuleFor(o => o.PizzaId, pizzaId).Generate();

    public static Order CreateStandardCustomerOrder() =>
        OrderFaker
            .RuleFor(o => o.CustomerName, "John Smith")
            .RuleFor(o => o.CustomerEmail, "john.smith@example.com")
            .Generate();

    public static List<Order> CreateBulkOrders(int count = 100) =>
        CreateOrders(count);
}
