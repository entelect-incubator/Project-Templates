namespace Core.Pizzas.V1;

using Core.Pizzas.V1.Database.Entities;

public static class CompiledQueries
{
    public static readonly Func<DatabaseContext, int, Task<Pizza>> Get =
        EF.CompileAsyncQuery((DatabaseContext db, int id) => db.Set<Pizza>().FirstOrDefault(c => c.Id == id && c.Disabled == false));
}
