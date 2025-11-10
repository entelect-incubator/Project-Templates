namespace Core;

using Core.Orders.V1.Database.EFMapping;
using Core.Orders.V1.Database.Entities;
using Core.Pizzas.V1.Database.EFMapping;
using Core.Pizzas.V1.Database.Entities;

public class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<Pizza> Pizzas { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new PizzaMap());
        modelBuilder.ApplyConfiguration(new OrderMap());
    }
}
