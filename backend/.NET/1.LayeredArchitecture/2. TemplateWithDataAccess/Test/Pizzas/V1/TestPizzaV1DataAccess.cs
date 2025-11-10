namespace Test.Pizzas.V1;

using Common.V1.Pizzas.Models;
using DataAccess.Contracts.V1;
using DataAccess.V1.Pizzas;
using Test.Setup.TestData.Pizza;

[TestFixture]
public class TestPizzaeV1DataAccess : QueryTestBase
{
    private IPizzaDataAccess handler;

    private PizzaModel model;

    [SetUp]
    public async Task Init()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true, true)
            .AddEnvironmentVariables()
            .Build();

        configuration.Bind("Settings", new Settings());

        this.handler = new PizzaDataAccess(this.Context);
        var result = await this.handler.Save(PizzaTestData.Create);
        if (result.HasError)
        {
            Assert.That(false, Is.False);
        }

        this.model = result.Data;
    }

    [Test]
    public async Task GetAsync()
    {
        var response = await this.handler.Get(this.model.Id);
        Assert.That(response, Is.Not.Null);
    }

    [Test]
    public async Task GetAllAsync()
    {
        var response = await this.handler.Search(new PizzaSearchModel
        {
            Name = this.model.Name,
            OrderBy = "Name desc",
        });
        var outcome = response.Count;

        Assert.That(outcome == 1, Is.True);
    }

    [Test]
    public async Task UpdateAsync()
    {
        this.model.Name = "Test";
        var response = await this.handler.Update(this.model.Id, PizzaTestData.Update);
        Assert.That(response != null && !response.HasError, Is.True);

        var outcome = response.Data.Name.Equals(PizzaTestData.Update.Name);
        Assert.That(outcome, Is.True);
    }

    [Test]
    public async Task DeleteAsync()
    {
        var response = await this.handler.Delete(this.model.Id);
        Assert.That(response != null && !response.HasError, Is.True);
    }
}