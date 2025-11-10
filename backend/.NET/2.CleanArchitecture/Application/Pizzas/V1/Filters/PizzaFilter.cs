namespace Application.Pizzas.V1.Filters;

using Domain.V1.Pizzas;

public static class PizzaFilter
{
    public static IQueryable<Pizza> FilterByDisabled(this IQueryable<Pizza> query, bool? disabled)
        => !disabled.HasValue ? query : query.Where(x => x.Disabled == disabled.Value);

    public static IQueryable<Pizza> FilterByName(this IQueryable<Pizza> query, string name)
        => string.IsNullOrWhiteSpace(name) ? query : query.Where(x => x.Name.Contains(name));
}
