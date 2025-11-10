namespace Core;

using Common.V1.Orders;
using Common.V1.Pizzas;
using Core.Database.EFMapping;

public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
{
    public DbSet<Pizza> Pizzas { get; set; }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new PizzaMap());
        modelBuilder.ApplyConfiguration(new OrderMap());
    }
}
