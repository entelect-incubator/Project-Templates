namespace Application.Pizzas.V1.Mappers;

using Domain.V1.Pizzas;
using Domain.V1.Pizzas.Models;

[Mapper]
public static partial class PizzaMapper
{
    public static partial PizzaModel Map(this Pizza entity);

    public static partial Pizza Map(this PizzaModel model);

    public static IEnumerable<PizzaModel> Map(this List<Pizza>? pizzas)
        => pizzas?.Select(x => x.Map()) ?? [];
}
