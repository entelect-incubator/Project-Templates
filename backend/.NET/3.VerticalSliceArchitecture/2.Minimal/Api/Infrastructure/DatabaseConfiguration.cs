namespace Api.Infrastructure;

using Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

/// <summary>
/// Database configuration extension that supports PostgreSQL (primary) with InMemory fallback for testing
/// </summary>
public static class DatabaseConfiguration
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("pizzadb")
            ?? configuration.GetConnectionString("DefaultConnection");

        if (!string.IsNullOrEmpty(connectionString) && IsPostgresConnection(connectionString))
        {
            // Use PostgreSQL (primary database provider)
            services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(connectionString)
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }
        else if (string.IsNullOrEmpty(connectionString))
        {
            // Use InMemory ONLY as fallback for local testing (no connection string provided)
            services.AddDbContext<DatabaseContext>(options =>
                options.UseInMemoryDatabase("PizzaDb")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }
        else
        {
            // Invalid connection string - use InMemory as safe default
            services.AddDbContext<DatabaseContext>(options =>
                options.UseInMemoryDatabase("PizzaDb")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }

        return services;
    }

    private static bool IsPostgresConnection(string connectionString)
    {
        return connectionString.Contains("postgres", StringComparison.OrdinalIgnoreCase)
            || connectionString.Contains("localhost:5432", StringComparison.OrdinalIgnoreCase)
            || connectionString.Contains("Server=", StringComparison.OrdinalIgnoreCase);
    }
}
