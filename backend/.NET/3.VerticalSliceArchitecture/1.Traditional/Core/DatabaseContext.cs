namespace Features;

using Features.Orders.V1.Entities;
using Features.Orders.V1.Mapping;
using Features.Pizzas.V1.Entities;
using Features.Pizzas.V1.Mapping;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Order> Orders { get; set; }

    public DbSet<Pizza> Pizzas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new OrderMap());
        modelBuilder.ApplyConfiguration(new PizzaMap());
    }
}
