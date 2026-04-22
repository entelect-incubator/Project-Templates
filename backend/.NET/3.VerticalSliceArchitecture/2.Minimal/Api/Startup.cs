namespace Api;

using Api.Endpoints;
using Api.Infrastructure;
using Api.Services;
using Common.StartupApp.App;
using Common.StartupApp.Services;
using Core;
using Microsoft.Extensions.DependencyInjection;

public static class Startup
{
    public static void RegisterServices(this WebApplicationBuilder builder)
        => builder.Services
        .AddDatabaseContext(builder.Configuration)
        .AddEndpointsApiExplorer()
        .AddCommon()
        .AddSecurity()
        .AddApplication()
        .AddSingleton<PizzaImageService>()
        .Scan(scan => scan
            .FromAssemblyOf<IEndpoint>()
            .AddClasses(classes => classes.AssignableTo<IEndpoint>())
            .AsSelf()
            .WithTransientLifetime());

    public static void RegisterMiddlewares(this WebApplication app)
    {
        app.AddCommon();
        app.AddV1Endpoint();
        app.AddSecurity();

        app.UseHttpsRedirection();
    }
}