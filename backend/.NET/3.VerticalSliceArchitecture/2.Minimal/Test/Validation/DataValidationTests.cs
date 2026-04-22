namespace Test.Validation;

using Core.Orders.V1.Database.Entities;
using Core.Pizzas.V1.Database.Entities;
using Test.Setup.TestData.Orders.V1;
using Test.Setup.TestData.Pizzas.V1;

[TestFixture]
public class DataValidationTests
{
    [Test]
    [TestCase(true)]
    [TestCase(false)]
    public void Pizza_DisabledCanBeBoolean(bool value)
    {
        var pizza = new Pizza { Name = "Test", DateCreated = DateTime.UtcNow, Disabled = value };

        Assert.That(pizza.Disabled, Is.EqualTo(value));
    }

    [Test]
    public void Order_PizzaIdIsRequired()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order.PizzaId, Is.GreaterThan(0));
    }

    [Test]
    public void Order_StatusIsValid()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order.Status, Is.AnyOf(
            OrderStatus.Confirmed,
            OrderStatus.Making,
            OrderStatus.Complete,
            OrderStatus.SentOutForDelivery));
    }

    [Test]
    public void PizzaModel_HasValidProperties()
    {
        var pizza = PizzaTestDataMother.CreatePizza();

        Assert.That(pizza.Name, Is.Not.Null.And.Not.Empty);
        Assert.That(pizza.Id, Is.GreaterThanOrEqualTo(0));
    }

    [Test]
    public void Order_EmailFormatIsValid()
    {
        var orders = OrderTestDataMother.CreateBulkOrders(100);

        var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";

        foreach (var order in orders)
        {
            Assert.That(order.CustomerEmail, Does.Match(emailPattern));
        }
    }

    [Test]
    public void Order_CustomerNameNotEmpty()
    {
        var orders = OrderTestDataMother.CreateCompleteOrders(100);

        Assert.That(orders, Has.All.Property("CustomerName").Not.Empty);
    }

    [Test]
    public void Pizza_AllPropertiesConsistent()
    {
        var pizzas = PizzaTestDataMother.CreatePizzas(100);

        foreach (var pizza in pizzas)
        {
            Assert.That(pizza.Name.Trim(), Is.Not.Empty);
            Assert.That(pizza.Id, Is.GreaterThanOrEqualTo(0));
            Assert.That(pizza.DateCreated, Is.Not.Null);
        }
    }

    [Test]
    public void Pizza_HasNameProperty()
    {
        var pizza = PizzaTestDataMother.CreatePepperoni();

        Assert.That(pizza.Name, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    public void Order_HasAllRequiredFields()
    {
        var order = OrderTestDataMother.CreateOrder();

        Assert.That(order.Id, Is.GreaterThanOrEqualTo(0));
        Assert.That(order.CustomerName, Is.Not.Empty);
        Assert.That(order.CustomerEmail, Is.Not.Empty);
        Assert.That(order.PizzaId, Is.GreaterThan(0));
    }
}
