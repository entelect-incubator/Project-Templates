namespace Api;

using Api.StartupApp.App;
using Api.StartupApp.Services;
using Core;
using Core.Pizzas.V1.Commands;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Logs;
using Serilog;
using Api.Services;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();
        builder.Host.UseSerilog();

        // OpenTelemetry logging for Aspire integration
        builder.Logging.AddOpenTelemetry(logging
            => logging.AddOtlpExporter(options => options.Endpoint = new Uri("https://localhost:21007")));

        // PostgreSQL Docker database (falls back to InMemory if no connection string)
        var connectionString = builder.Configuration.GetConnectionString("pizzadb")
            ?? builder.Configuration.GetConnectionString("DefaultConnection");

        if (!string.IsNullOrEmpty(connectionString))
        {
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(connectionString)
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }
        else
        {
            builder.Services.AddDbContext<DatabaseContext>(options =>
                options.UseInMemoryDatabase("PizzaDb")
                    .EnableDetailedErrors()
                    .EnableSensitiveDataLogging());
        }

        builder.Services.AddCommon();
        builder.Services.AddSecurity();
        builder.Services.AddApplication();
        builder.Services.AddSingleton<PizzaImageService>();

        var app = builder.Build();

        app.AddCommon();
        app.AddSecurity();

        await app.RunAsync();
    }
}
