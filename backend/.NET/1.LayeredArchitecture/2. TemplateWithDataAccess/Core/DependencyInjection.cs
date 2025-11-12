namespace Core;

using System.Reflection;
using Common.V1.Orders.Models;
using Common.V1.Pizzas.Models;
using Core.V1.Orders.Commands;
using Core.V1.Orders.Queries;
using Core.V1.Pizzas.Commands;
using Core.V1.Pizzas.Queries;
using DataAccess;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.Scan(scan =>
            scan.FromApplicationDependencies()
                .AddClasses(classes => classes.InNamespaces("DataAccess"))
                .AsImplementedInterfaces()
                .WithTransientLifetime());

        // Register Pizza command and query handlers (existing)
        services.AddTransient<ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>, CreatePizzaCommandHandler>();
        services.AddTransient<ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>, UpdatePizzaCommandHandler>();
        services.AddTransient<ICommandHandler<DeletePizzaCommand, Result>, DeletePizzaCommandHandler>();
        services.AddTransient<IQueryHandler<GetPizzaQuery, Result<PizzaModel>>, GetPizzaQueryHandler>();
        services.AddTransient<IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>, GetAllPizzasQueryHandler>();

        // Register Order command and query handlers (new)
        services.AddTransient<ICommandHandler<CreateOrderCommand, Result<OrderModel>>, CreateOrderCommandHandler>();
        services.AddTransient<ICommandHandler<CompleteOrderCommand, Result<OrderModel>>, CompleteOrderCommandHandler>();
        services.AddTransient<IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>, GetOrderStatusQueryHandler>();

        services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();

        return services;
    }
}