namespace Api;

using Microsoft.AspNetCore.Server.Kestrel.Core;
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
        //// Enable Kestrel with HTTP/3 and configurable port
        builder.WebHost.ConfigureKestrel((context, options) =>
        {
            var port = int.Parse(context.Configuration["Kestrel:Port"] ?? "5000");
            options.ListenAnyIP(port, listenOptions => listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3);
            options.AddServerHeader = false;
        });

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
