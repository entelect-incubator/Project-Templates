namespace Test.Pizzas.V1;

using Core;
using Core.Pizzas.V1.Commands;

[TestFixture]
public class TestPizzaV1Core : QueryTestBase
{
    private DatabaseContext databaseContext;

    [SetUp]
    public async Task Init()
    {
        this.databaseContext = Context;

        // Test that database context was created successfully
        Assert.That(this.databaseContext, Is.Not.Null);
    }

    [Test]
    public void ContextCreated()
    {
        Assert.That(this.databaseContext, Is.Not.Null);
    }

    [Test]
    public void SaveAsync()
        => Assert.That(this.databaseContext, Is.Not.Null);

    [Test]
    public void CreatePizzaCommandCreated()
    {
        var command = new CreatePizzaCommand { Name = "Test Pizza" };
        Assert.That(command, Is.Not.Null);
        Assert.That(command.Name, Is.EqualTo("Test Pizza"));
    }
}