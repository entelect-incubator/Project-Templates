namespace Core;

using System.Reflection;
using Common.V1.Orders.Models;
using Common.V1.Pizzas.Models;
using Core.Orders.V1.Commands;
using Core.Orders.V1.Queries;
using Core.Pizzas.V1.Commands;
using Core.Pizzas.V1.Queries;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    private const string DatabaseName = "DB";

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddDbContext<DatabaseContext>(builder => builder.UseInMemoryDatabase(DatabaseName));

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // Register the Dispatcher from Utilities.CQRS
        services.AddTransient<Dispatcher>();

        // Register Pizza command and query handlers (existing)
        services.AddTransient<ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>, CreatePizzaCommandHandler>();
        services.AddTransient<ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>, UpdatePizzaCommandHandler>();
        services.AddTransient<IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>, GetAllPizzasQueryHandler>();

        // Register Order command and query handlers (new)
        services.AddTransient<ICommandHandler<CreateOrderCommand, Result<OrderModel>>, CreateOrderCommandHandler>();
        services.AddTransient<ICommandHandler<CompleteOrderCommand, Result<OrderModel>>, CompleteOrderCommandHandler>();
        services.AddTransient<IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>, GetOrderStatusQueryHandler>();

        services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();

        return services;
    }
}