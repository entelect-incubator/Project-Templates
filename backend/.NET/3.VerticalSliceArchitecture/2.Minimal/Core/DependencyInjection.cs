namespace Core;

using System.Reflection;
using Core.Orders.V1.Commands;
using Core.Orders.V1.Models;
using Core.Orders.V1.Queries;
using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Models;
using Core.Pizzas.V1.Queries;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.AddTransient<Dispatcher>();

        // Register command and query handlers
        services.Scan(scan => scan
            .FromAssemblyOf<CreatePizzaCommandHandler>() // or any handler in that assembly
            .AddClasses(c => c.Where(type =>
                type.Name.EndsWith("CommandHandler") ||
                type.Name.EndsWith("QueryHandler")))
            .AsImplementedInterfaces()
            .WithTransientLifetime());

        services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();

        return services;
    }
}