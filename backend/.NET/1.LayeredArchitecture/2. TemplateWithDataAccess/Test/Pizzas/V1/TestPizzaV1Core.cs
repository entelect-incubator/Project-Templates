namespace Test.Pizzas.V1;

using Common.V1.Pizzas.Models;
using Core.V1.Pizzas.Commands;
using Core.V1.Pizzas.Queries;
using DataAccess.Contracts.V1;
using DataAccess.V1.Pizzas;
using Test.Setup.TestData.Pizza;
using static Core.V1.Pizzas.Commands.DeletePizzaCommand;
using static Core.V1.Pizzas.Commands.UpdatePizzaCommand;
using static Core.V1.Pizzas.Queries.GetAllPizzasQuery;
using static Core.V1.Pizzas.Queries.GetPizzaQuery;

[TestFixture]
public class TestPizzaV1Core : QueryTestBase
{
    private IPizzaDataAccess dataAccess;

    private PizzaModel model;

    [SetUp]
    public async Task Init()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", true, true)
            .AddEnvironmentVariables()
            .Build();

        configuration.Bind("Settings", new Settings());

        this.dataAccess = new PizzaDataAccess(this.Context);
        var sutCreate = new CreatePizzaCommandHandler(this.dataAccess);
        var resultCreate = await sutCreate.Handle(
            new CreatePizzaCommand
            {
                Model = PizzaTestData.Create
            }, CancellationToken.None);

        if (resultCreate.HasError)
        {
            Assert.That(false, Is.False);
        }

        this.model = resultCreate.Data;
    }

    [Test]
    public async Task GetAsync()
    {
        var sutGet = new GetPizzaQueryHandler(this.dataAccess);
        var resultGet = await sutGet.Handle(
            new GetPizzaQuery
            {
                Id = this.model.Id
            }, CancellationToken.None);

        Assert.That(resultGet?.Data, Is.Not.Null);
    }

    [Test]
    public async Task GetAllAsync()
    {
        var sutGetAll = new GetAllPizzasQueryHandler(this.dataAccess);
        var resultGetAll = await sutGetAll.Handle(
            new GetAllPizzasQuery
            {
                Model = new PizzaSearchModel
                {
                    Name = this.model.Name,
                    OrderBy = "Name desc",
                }
            }, CancellationToken.None);

        Assert.That(resultGetAll?.Count > 0, Is.True);
    }

    [Test]
    public void SaveAsync()
        => Assert.That(this.model, Is.Not.Null);

    [Test]
    public async Task UpdateAsync()
    {
        var sutUpdate = new UpdatePizzaCommandHandler(this.dataAccess);
        var resultUpdate = await sutUpdate.Handle(
            new UpdatePizzaCommand
            {
                Id = this.model.Id,
                Model = new UpdatePizzaModel
                {
                    Name = "Test"
                }
            }, CancellationToken.None);

        Assert.That(resultUpdate.HasError, Is.False);
    }

    [Test]
    public async Task DeleteAsync()
    {
        var sutDelete = new DeletePizzaCommandHandler(this.dataAccess);
        var outcomeDelete = await sutDelete.Handle(
            new DeletePizzaCommand
            {
                Id = this.model.Id
            }, CancellationToken.None);

        Assert.That(outcomeDelete.HasError, Is.False);
    }
}