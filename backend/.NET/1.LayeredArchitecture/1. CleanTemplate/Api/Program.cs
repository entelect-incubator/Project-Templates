namespace Api;

using Api.StartupApp.App;
using Api.StartupApp.Services;
using Core;
using Core.Pizzas.V1.Commands;
using Serilog;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();
        builder.Host.UseSerilog();
        builder.WebHost.ConfigureKestrel(opt => opt.AddServerHeader = false);

        builder.Services.AddDbContext<DatabaseContext>(builder => builder.UseInMemoryDatabase("DB"));

        builder.Services.AddCommon();
        builder.Services.AddSecurity();
        builder.Services.AddApplication();

        var app = builder.Build();

        app.AddCommon();
        app.AddSecurity();

        app.Run();
    }
}
