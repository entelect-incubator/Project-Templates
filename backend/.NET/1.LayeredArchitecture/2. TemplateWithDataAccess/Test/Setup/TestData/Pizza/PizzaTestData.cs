namespace Test.Setup.TestData.Pizza;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;

public static class PizzaTestData
{
    public static Pizza Pizza = new()
    {
        Id = 1,
        Disabled = false,
        Name = "Pepperoni Pizza",
        DateCreated = DateTime.Now
    };

    public static PizzaModel PizzaModel = new()
    {
        Id = 1,
        Disabled = false,
        Name = "Hawaiian Pizza",
        DateCreated = DateTime.Now
    };

    public static CreatePizzaModel Create = new()
    {
        Name = "Margherita Pizza",
        Disabled = false
    };

    public static UpdatePizzaModel Update = new()
    {
        Name = "BBQ Chicken Pizza",
    };
}
