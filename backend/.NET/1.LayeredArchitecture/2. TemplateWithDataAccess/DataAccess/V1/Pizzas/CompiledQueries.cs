namespace DataAccess.V1.Pizzas;

using Common.V1.Pizzas;

public static class CompiledQueries
{
    public static readonly Func<DatabaseContext, int, Task<Pizza>> Get =
        EF.CompileAsyncQuery((DatabaseContext db, int id) => db.Set<Pizza>().FirstOrDefault(c => c.Id == id && c.Disabled == false));
}
