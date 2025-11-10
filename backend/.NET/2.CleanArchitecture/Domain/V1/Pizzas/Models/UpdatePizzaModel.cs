namespace Domain.V1.Pizzas.Models;

public sealed class UpdatePizzaModel
{
    public string? Name { get; set; }

    public bool? Disabled { get; set; }
}
