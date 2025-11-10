namespace Application.Orders.V1.Mappers;

using Domain.V1.Orders;
using Domain.V1.Orders.Models;

[Mapper]
public static partial class OrderMapper
{
    public static partial OrderModel Map(this Order entity);

    public static partial Order Map(this OrderModel model);

    public static List<OrderModel> Map(this List<Order>? entities)
        => entities?.Select(x => x.Map())?.ToList() ?? [];
}