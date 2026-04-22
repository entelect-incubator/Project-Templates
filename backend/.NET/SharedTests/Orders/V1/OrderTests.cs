namespace Test.Orders.V1;

using System.Linq;
using Test.Setup.TestData.Orders.V1;

[TestFixture]
public class OrderTests : QueryTestBase
{
    private DatabaseContext databaseContext;

    [SetUp]
    public void Init()
    {
        this.databaseContext = Context;
        Assert.That(this.databaseContext, Is.Not.Null);
    }

    [Test]
    public void DatabaseContext_HasOrdersDbSet()
    {
        Assert.That(this.databaseContext.Orders, Is.Not.Null);
    }

    [Test]
    public void OrderEntity_CanBeCreated()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order, Is.Not.Null);
        Assert.That(order.CustomerName, Is.Not.Empty);
        Assert.That(order.CustomerEmail, Is.Not.Empty);
        Assert.That(order.PizzaId, Is.GreaterThan(0));
    }

    [Test]
    [TestCase(Domain.V1.Orders.OrderStatus.Confirmed)]
    [TestCase(Domain.V1.Orders.OrderStatus.Making)]
    [TestCase(Domain.V1.Orders.OrderStatus.Complete)]
    [TestCase(Domain.V1.Orders.OrderStatus.SentOutForDelivery)]
    public void OrderTestDataMother_CreateWithStatus_GeneratesOrderWithCorrectStatus(Domain.V1.Orders.OrderStatus expectedStatus)
    {
        var order = OrderTestDataMother.CreateOrderWithStatus(expectedStatus);

        Assert.That(order.Status, Is.EqualTo(expectedStatus));
    }

    [Test]
    public void OrderTestDataMother_CreateForPizza_GeneratesOrderForSpecificPizza()
    {
        var pizzaId = 42;
        var order = OrderTestDataMother.CreateOrderForPizza(pizzaId);

        Assert.That(order.PizzaId, Is.EqualTo(pizzaId));
    }

    [Test]
    [TestCase(5)]
    [TestCase(10)]
    [TestCase(25)]
    public void OrderTestDataMother_CreateMany_GeneratesCorrectCount(int count)
    {
        var orders = OrderTestDataMother.CreateBulkOrders(count);

        Assert.That(orders, Has.Count.EqualTo(count));
    }

    [Test]
    public void OrderTestDataMother_CreateConfirmedOrders_GeneratesOrdersInConfirmedStatus()
    {
        var orders = OrderTestDataMother.CreateConfirmedOrders(10);

        Assert.That(orders, Has.Count.EqualTo(10));
        Assert.That(orders, Has.All.Property("Status").EqualTo(Domain.V1.Orders.OrderStatus.Confirmed));
    }

    [Test]
    public void OrderTestDataMother_CreateCompleteOrders_GeneratesOrdersInCompleteStatus()
    {
        var orders = OrderTestDataMother.CreateCompleteOrders(10);

        Assert.That(orders, Has.Count.EqualTo(10));
        Assert.That(orders, Has.All.Property("Status").EqualTo(Domain.V1.Orders.OrderStatus.Complete));
    }

    [Test]
    public void Order_HasValidCustomerEmail()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order.CustomerEmail, Does.Match(@"^[^@\s]+@[^@\s]+\.[^@\s]+$"));
    }

    [Test]
    public void Order_DateCreated_IsInPast()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order.DateCreated, Is.LessThanOrEqualTo(DateTimeOffset.UtcNow));
    }

    [Test]
    public void OrderModel_CanBeCreated()
    {
        var model = OrderTestDataMother.CreateOrderModel();

        Assert.That(model, Is.Not.Null);
        Assert.That(model.CustomerName, Is.Not.Empty);
        Assert.That(model.CustomerEmail, Is.Not.Empty);
    }

    [Test]
    public void OrderModel_WithStatus_HasCorrectStatus()
    {
        var status = Domain.V1.Orders.Models.OrderStatus.Making;
        var model = OrderTestDataMother.CreateOrderModelWithStatus(status);

        Assert.That(model.Status, Is.EqualTo(status));
    }

    [Test]
    [TestCase(3)]
    [TestCase(15)]
    [TestCase(50)]
    public void OrderModelMother_CreateMany_GeneratesCorrectCount(int count)
    {
        var models = OrderTestDataMother.CreateOrderModels(count);

        Assert.That(models, Has.Count.EqualTo(count));
    }

    [Test]
    public void Order_UniqueIds_AreGenerated()
    {
        var orders = OrderTestDataMother.CreateCompleteOrders(100);
        var uniqueIds = orders.Select(o => o.Id).Distinct().Count();

        Assert.That(uniqueIds, Is.EqualTo(100));
    }

    [Test]
    public void Order_CustomerInfo_IsNotEmpty()
    {
        var orders = OrderTestDataMother.CreateConfirmedOrders(50);

        foreach (var order in orders)
        {
            Assert.That(order.CustomerName, Is.Not.Null.And.Not.Empty);
            Assert.That(order.CustomerEmail, Is.Not.Null.And.Not.Empty);
        }
    }

    [Test]
    public void Order_PizzaId_IsPositive()
    {
        var orders = OrderTestDataMother.CreateBulkOrders(50);

        Assert.That(orders, Has.All.Property("PizzaId").GreaterThan(0));
    }

    [Test]
    public void Order_StatusCanBeAnyValidValue()
    {
        var statuses = new[]
        {
            OrderStatus.Confirmed,
            OrderStatus.Making,
            OrderStatus.Complete,
            OrderStatus.SentOutForDelivery
        };

        foreach (var status in statuses)
        {
            var order = OrderTestDataMother.CreateOrderWithStatus(status);
            Assert.That(order.Status, Is.EqualTo(status));
        }
    }
}
