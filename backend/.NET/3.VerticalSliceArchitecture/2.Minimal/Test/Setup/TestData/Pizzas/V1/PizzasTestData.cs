namespace Test.Setup.TestData.Pizzas.V1;

using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Database.Entities;
using Core.Pizzas.V1.Models;

/// <summary>
/// Object Mother pattern for Pizza test data generation.
/// Provides factory methods to create Pizza entities with various configurations.
/// Uses Bogus library for realistic random data generation.
/// </summary>
public static class PizzaTestDataMother
{
    private static readonly Faker<Pizza> PizzaFaker = new Faker<Pizza>()
        .RuleFor(p => p.Id, f => f.UniqueIndex + 1)
        .RuleFor(p => p.Name, f => f.Commerce.ProductName())
        .RuleFor(p => p.DateCreated, f => f.Date.PastDateOnly().ToDateTime(TimeOnly.MinValue))
        .RuleFor(p => p.Disabled, f => f.Random.Bool(0.2f));

    private static readonly Faker<PizzaModel> PizzaModelFaker = new Faker<PizzaModel>()
        .RuleFor(p => p.Id, f => f.UniqueIndex + 1)
        .RuleFor(p => p.Name, f => f.Commerce.ProductName())
        .RuleFor(p => p.DateCreated, f => f.Date.PastOffset())
        .RuleFor(p => p.Disabled, f => f.Random.Bool(0.2f));

    private static readonly Faker<CreatePizzaCommand> CreateCommandFaker = new Faker<CreatePizzaCommand>()
        .RuleFor(c => c.Name, f => f.Commerce.ProductName());

    private static readonly Faker<UpdatePizzaModel> UpdateModelFaker = new Faker<UpdatePizzaModel>()
        .RuleFor(u => u.Name, f => f.Commerce.ProductName())
        .RuleFor(u => u.Disabled, f => f.Random.Bool(0.3f));

    public static Pizza CreatePizza() => PizzaFaker.Generate();

    public static Pizza CreatePizzaWithName(string name) =>
        PizzaFaker.RuleFor(p => p.Name, name).Generate();

    public static Pizza CreateActivePizza() =>
        PizzaFaker.RuleFor(p => p.Disabled, false).Generate();

    public static Pizza CreateDisabledPizza() =>
        PizzaFaker.RuleFor(p => p.Disabled, true).Generate();

    public static List<Pizza> CreatePizzas(int count = 5) =>
        PizzaFaker.Generate(count);

    public static List<Pizza> CreateActivePizzas(int count = 5) =>
        PizzaFaker.RuleFor(p => p.Disabled, false).Generate(count);

    public static PizzaModel CreatePizzaModel() => PizzaModelFaker.Generate();

    public static PizzaModel CreatePizzaModelWithName(string name) =>
        PizzaModelFaker.RuleFor(p => p.Name, name).Generate();

    public static List<PizzaModel> CreatePizzaModels(int count = 5) =>
        PizzaModelFaker.Generate(count);

    public static CreatePizzaCommand CreateCreateCommand() =>
        CreateCommandFaker.Generate();

    public static CreatePizzaCommand CreateCreateCommandWithName(string name) =>
        CreateCommandFaker.RuleFor(c => c.Name, name).Generate();

    public static List<CreatePizzaCommand> CreateCreateCommands(int count = 5) =>
        CreateCommandFaker.Generate(count);

    public static UpdatePizzaModel CreateUpdateModel() =>
        UpdateModelFaker.Generate();

    public static UpdatePizzaModel CreateUpdateModelWithName(string name) =>
        UpdateModelFaker.RuleFor(u => u.Name, name).Generate();

    public static List<UpdatePizzaModel> CreateUpdateModels(int count = 5) =>
        UpdateModelFaker.Generate(count);

    public static Pizza CreateMargherita() =>
        CreatePizzaWithName("Margherita");

    public static Pizza CreatePepperoni() =>
        CreatePizzaWithName("Pepperoni");

    public static Pizza CreateHawaiian() =>
        CreatePizzaWithName("Hawaiian");

    public static List<Pizza> CreateVarietyPack() => new()
    {
        CreateMargherita(),
        CreatePepperoni(),
        CreateHawaiian(),
        CreatePizzaWithName("BBQ Chicken"),
        CreatePizzaWithName("Vegetarian"),
    };
}
