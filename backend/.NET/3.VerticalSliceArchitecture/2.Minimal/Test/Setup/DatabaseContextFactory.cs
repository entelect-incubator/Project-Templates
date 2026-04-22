namespace Test.Setup;

using global::Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

public class DatabaseContextFactory
{
    protected DatabaseContextFactory()
    {
    }

    public static DatabaseContext DBContextAsync()
    {
        var services = new ServiceCollection()
            .AddEntityFrameworkInMemoryDatabase();

        var serviceProvider = services.BuildServiceProvider();

        var options = new DbContextOptionsBuilder<DatabaseContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .UseInternalServiceProvider(serviceProvider)
            .Options;

        return new DatabaseContext(options);
    }

    public static DatabaseContext Create()
    {
        return DBContextAsync();
    }

    public static void Destroy(DatabaseContext context)
    {
        context?.Dispose();
    }
}
