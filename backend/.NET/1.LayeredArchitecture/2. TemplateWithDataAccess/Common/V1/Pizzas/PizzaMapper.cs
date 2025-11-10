namespace Common.V1.Pizzas;

using Common.V1.Pizzas.Models;

[Mapper]
public static partial class PizzaMapper
{
    public static partial PizzaModel Map(this Pizza entity);

    public static partial Pizza Map(this PizzaModel model);

    public static partial Pizza MapCreate(this CreatePizzaModel model);

    public static IEnumerable<PizzaModel> Map(this List<Pizza>? pizzas)
        => pizzas?.Select(x => x.Map()) ?? [];
}