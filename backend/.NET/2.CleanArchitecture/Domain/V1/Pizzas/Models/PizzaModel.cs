namespace Domain.V1.Pizzas.Models;

public sealed class PizzaModel
{
    public int Id { get; set; }

    public string Name { get; set; }

    public DateTimeOffset? DateCreated { get; set; }

    public bool? Disabled { get; set; }
}
