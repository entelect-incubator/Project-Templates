namespace Features.Orders.V1.Mappers;

using Features.Orders.V1.Entities;
using Features.Orders.V1.Models;

[Mapper]
public static partial class OrderMapper
{
    public static partial OrderModel Map(this Order entity);

    public static partial Order Map(this OrderModel model);

    public static List<OrderModel> Map(this List<Order>? entities)
        => entities?.Select(x => x.Map())?.ToList() ?? [];
}