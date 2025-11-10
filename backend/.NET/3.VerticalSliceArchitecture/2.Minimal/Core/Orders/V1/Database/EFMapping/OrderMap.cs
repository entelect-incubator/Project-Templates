namespace Core.Orders.V1.Database.EFMapping;

using Core.Orders.V1.Database.Entities;
using Core.Orders.V1.Models;

public class OrderMap : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.CustomerName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(o => o.CustomerEmail)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(o => o.PizzaId)
            .IsRequired();

        builder.Property(o => o.Status)
            .IsRequired()
            .HasDefaultValue(OrderStatus.Confirmed);

        builder.Property(o => o.DateCreated)
            .IsRequired();
    }
}