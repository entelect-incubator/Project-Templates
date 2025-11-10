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
    private const string DatabaseName = "DB";

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddDbContext<DatabaseContext>(builder => builder.UseInMemoryDatabase(DatabaseName));

        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        services.AddTransient<Dispatcher>();

        // Register command and query handlers
        services.AddTransient<ICommandHandler<CreatePizzaCommand, Result<PizzaModel>>, CreatePizzaCommandHandler>();
        services.AddTransient<ICommandHandler<UpdatePizzaCommand, Result<PizzaModel>>, UpdatePizzaCommandHandler>();
        services.AddTransient<IQueryHandler<GetAllPizzasQuery, Result<IEnumerable<PizzaModel>>>, GetAllPizzasQueryHandler>();
        services.AddTransient<ICommandHandler<CreateOrderCommand, Result<OrderModel>>, CreateOrderCommandHandler>();
        services.AddTransient<ICommandHandler<CompleteOrderCommand, Result<OrderModel>>, CompleteOrderCommandHandler>();
        services.AddTransient<IQueryHandler<GetOrderStatusQuery, Result<OrderStatus>>, GetOrderStatusQueryHandler>();

        services.AddHealthChecks().AddDbContextCheck<DatabaseContext>();

        return services;
    }
}