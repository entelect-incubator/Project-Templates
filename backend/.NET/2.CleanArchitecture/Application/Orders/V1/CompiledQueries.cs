namespace Application.Orders.V1;

using Domain.V1.Orders;

public static class CompiledQueries
{
    public static readonly Func<DatabaseContext, int, Task<Order>> Get =
        EF.CompileAsyncQuery((DatabaseContext db, int id) => db.Set<Order>().FirstOrDefault(c => c.Id == id));
}
