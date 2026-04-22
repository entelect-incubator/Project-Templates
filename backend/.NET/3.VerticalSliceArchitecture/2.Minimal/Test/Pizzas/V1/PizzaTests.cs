namespace Test.Pizzas.V1;

using Core;
using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Models;
using Core.Pizzas.V1.Queries;
using Test.Setup;
using Test.Setup.TestData.Pizzas.V1;

[TestFixture]
public class PizzaTests : QueryTestBase
{
    private DatabaseContext databaseContext;

    [SetUp]
    public void Init()
    {
        this.databaseContext = Context;
        Assert.That(this.databaseContext, Is.Not.Null);
    }

    [Test]
    public void DatabaseContextInitialized()
    {
        Assert.That(this.databaseContext, Is.Not.Null);
        Assert.That(this.databaseContext.Pizzas, Is.Not.Null);
    }

    [Test]
    public void CreatePizzaCommand_WithValidName_CreatesCommand()
    {
        var command = new CreatePizzaCommand { Name = "Margherita" };

        Assert.That(command, Is.Not.Null);
        Assert.That(command.Name, Is.EqualTo("Margherita"));
    }

    [Test]
    public void CreatePizzaCommand_WithRandomData_CreatesCommand()
    {
        var pizza = PizzaTestDataMother.CreateActivePizza();

        var command = new CreatePizzaCommand { Name = pizza.Name };

        Assert.That(command.Name, Is.EqualTo(pizza.Name));
    }

    [Test]
    public void UpdatePizzaCommand_WithValidData_CreatesCommand()
    {
        var pizza = PizzaTestDataMother.CreatePizza();
        var updateModel = new UpdatePizzaModel { Name = "Updated Pizza", Disabled = false };

        var command = new UpdatePizzaCommand
        {
            Id = pizza.Id,
            Model = updateModel
        };

        Assert.That(command.Id, Is.EqualTo(pizza.Id));
        Assert.That(command.Model.Name, Is.EqualTo("Updated Pizza"));
    }

    [Test]
    public void GetAllPizzasQuery_WithDefaults_CreatesQuery()
    {
        var query = new GetAllPizzasQuery { OrderBy = "Name" };

        Assert.That(query, Is.Not.Null);
        Assert.That(query.OrderBy, Is.EqualTo("Name"));
    }

    [Test]
    [TestCase(5)]
    [TestCase(10)]
    [TestCase(20)]
    public void PizzaTestDataMother_CreateMany_GeneratesCorrectCount(int count)
    {
        var pizzas = PizzaTestDataMother.CreatePizzas(count);

        Assert.That(pizzas, Has.Count.EqualTo(count));
        Assert.That(pizzas, Has.All.Property("Name").Not.Empty);
        Assert.That(pizzas, Has.All.Property("Id").GreaterThanOrEqualTo(0));
    }

    [Test]
    public void PizzaTestDataMother_CreateActive_GeneratesNonDisabledPizzas()
    {
        var pizzas = PizzaTestDataMother.CreateActivePizzas(10);

        Assert.That(pizzas, Has.Count.EqualTo(10));
        Assert.That(pizzas, Has.All.Property("Disabled").False);
    }

    [Test]
    public void PizzaTestDataMother_CreateDisabled_GeneratesDisabledPizza()
    {
        var pizza = PizzaTestDataMother.CreateDisabledPizza();

        Assert.That(pizza.Disabled, Is.True);
    }

    [Test]
    public void PizzaTestDataMother_CreateWithName_GeneratesPizzaWithCorrectName()
    {
        var expectedName = "Premium Margherita";
        var pizza = PizzaTestDataMother.CreatePizzaWithName(expectedName);

        Assert.That(pizza.Name, Is.EqualTo(expectedName));
    }

    [Test]
    public void PizzaModel_HasRequiredProperties()
    {
        var model = PizzaTestDataMother.CreatePizzaModel();

        Assert.That(model.Id, Is.GreaterThanOrEqualTo(0));
        Assert.That(model.Name, Is.Not.Empty);
        Assert.That(model.DateCreated, Is.Not.Null);
    }

    [Test]
    public void PizzaTestDataMother_UniqueIds_GeneratesUniqueIdentifiers()
    {
        var pizzas = PizzaTestDataMother.CreatePizzaModels(100);
        var ids = pizzas.Select(p => p.Id).Distinct().Count();

        Assert.That(ids, Is.EqualTo(100));
    }

    [Test]
    public void PizzaTestDataMother_ConsistentProperties_AllPizzasHaveRequiredFields()
    {
        var pizzas = PizzaTestDataMother.CreatePizzaModels(50);

        foreach (var pizza in pizzas)
        {
            Assert.That(pizza.Name, Is.Not.Null.And.Not.Empty);
            Assert.That(pizza.Id, Is.GreaterThanOrEqualTo(0));
        }
    }
}
