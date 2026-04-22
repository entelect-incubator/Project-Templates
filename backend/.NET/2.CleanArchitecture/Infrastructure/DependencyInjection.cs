namespace Infrastructure;

using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration = null)
    {
        var connectionString = configuration?.GetConnectionString("pizzadb")
            ?? configuration?.GetConnectionString("DefaultConnection");

        if (!string.IsNullOrEmpty(connectionString))
        {
            // Use PostgreSQL (primary database provider)
            services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(connectionString)
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }
        else
        {
            // Use InMemory as fallback for local testing
            services.AddDbContext<DatabaseContext>(options =>
                options.UseInMemoryDatabase("PizzaDb")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }

        services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();

        return services;
    }
}