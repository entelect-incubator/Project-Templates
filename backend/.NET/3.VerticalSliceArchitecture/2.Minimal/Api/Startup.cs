namespace Api;

using Api.Endpoints;
using Api.Endpoints.V1.Orders;
using Api.Endpoints.V1.Pizzas;
using Common.StartupApp.App;
using Common.StartupApp.Services;
using Core;
using Microsoft.Extensions.DependencyInjection;

public static class Startup
{
    public static void RegisterServices(this WebApplicationBuilder builder)
        => builder.Services
        .AddEndpointsApiExplorer()
        .AddCommon()
        .AddSecurity()
        .AddApplication()
        .AddTransient<SearchPizzaEndpoint>()
        .AddTransient<CreatePizzaEndpoint>()
        .AddTransient<UpdatePizzaEndpoint>()
        .AddTransient<CreateOrderEndpoint>()
        .AddTransient<CompleteOrderEndpoint>()
        .AddTransient<GetOrderStatusEndpoint>();

    public static void RegisterMiddlewares(this WebApplication app)
    {
        app.AddCommon();
        app.AddV1Endpoint();
        app.AddSecurity();

        app.UseHttpsRedirection();
    }
}