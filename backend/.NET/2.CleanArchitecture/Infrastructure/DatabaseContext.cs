namespace Infrastructure;

using Domain.V1.Orders;
using Domain.V1.Pizzas;
using Infrastructure.Mapping;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Pizza> Pizzas { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new OrderMap());
        modelBuilder.ApplyConfiguration(new PizzaMap());
    }
}
