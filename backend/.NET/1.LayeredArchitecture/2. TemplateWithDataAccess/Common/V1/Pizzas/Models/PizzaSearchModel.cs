namespace Common.V1.Pizzas.Models;

public sealed class PizzaSearchModel : BaseSearchModel
{
    public string? Name { get; set; }

    public DateTimeOffset? DateCreated { get; set; }

    public bool? Disabled { get; set; }
}
