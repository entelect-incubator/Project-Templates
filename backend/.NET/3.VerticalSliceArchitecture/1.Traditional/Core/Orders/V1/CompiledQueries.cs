namespace Features.Orders.V1;

using Features.Orders.V1.Entities;

public static class CompiledQueries
{
    public static readonly Func<DatabaseContext, int, Task<Order>> Get =
        EF.CompileAsyncQuery((DatabaseContext db, int id) => db.Set<Order>().FirstOrDefault(c => c.Id == id));
}
