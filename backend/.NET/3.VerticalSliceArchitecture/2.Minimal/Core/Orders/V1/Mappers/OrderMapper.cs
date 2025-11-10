namespace Core.Orders.V1.Mappers;

using Core.Orders.V1.Database.Entities;
using Core.Orders.V1.Models;
using Riok.Mapperly.Abstractions;

[Mapper]
public static partial class OrderMapper
{
    public static partial OrderModel Map(this Order entity);

    public static partial Order Map(this OrderModel model);

    public static List<OrderModel> Map(this List<Order> entities)
        => entities.Select(x => x.Map()).ToList();
}
