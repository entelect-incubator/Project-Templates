namespace Benchmark.Testing.Setup.TestData.Pizza.V1;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;
using Core.Pizzas.V1.Commands;

public static class PizzaTestData
{
    public static Pizza GetPizza() => new()
    {
        Id = 1,
        Disabled = false,
        Name = "Pepperoni Pizza",
        DateCreated = DateTime.Now,
    };

    public static PizzaModel GetPizzaModel() => new()
    {
        Id = 1,
        Disabled = false,
        Name = "Hawaiian Pizza",
        DateCreated = DateTime.Now,
    };

    public static CreatePizzaCommand GetCreateCommand() => new()
    {
        Name = "Margherita Pizza",
        Disabled = false,
    };

    public static UpdatePizzaModel GetUpdateModel() => new()
    {
        Name = "BBQ Chicken Pizza",
    };
}
