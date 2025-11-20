namespace Test.Setup.TestData.Pizza.V1;

using Common.V1.Pizzas;
using Common.V1.Pizzas.Models;
using Core.Pizzas.V1.Commands;

public static class PizzaTestData
{
    // Returns a new Pizza instance each time
    public static Pizza GetPizza() => new()
    {
        Id = 1,
        Disabled = false,
        Name = "Pepperoni Pizza",
        DateCreated = DateTime.Now
    };

    // Returns a new PizzaModel instance
    public static PizzaModel GetPizzaModel() => new()
    {
        Id = 1,
        Disabled = false,
        Name = "Hawaiian Pizza",
        DateCreated = DateTime.Now
    };

    // Returns a new CreatePizzaCommand instance
    public static CreatePizzaCommand GetCreateCommand() => new()
    {
        Name = "Margherita Pizza",
        Disabled = false
    };

    // Returns a new UpdatePizzaModel instance
    public static UpdatePizzaModel GetUpdateModel() => new()
    {
        Name = "BBQ Chicken Pizza",
    };
}
