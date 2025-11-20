namespace Core.Orders.V1.Database.EFMapping;

using Core.Orders.V1.Database.Entities;
using Core.Orders.V1.Models;

public class OrderMap : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");

        builder.HasKey(o => o.Id);

        builder.Property(o => o.Id)
            .HasColumnType("integer")
            .ValueGeneratedOnAdd();

        builder.Property(o => o.CustomerName)
            .IsRequired()
            .HasColumnType("character varying(100)")
            .HasMaxLength(100);

        builder.Property(o => o.CustomerEmail)
            .IsRequired()
            .HasColumnType("character varying(100)")
            .HasMaxLength(100);

        builder.Property(o => o.PizzaId)
            .IsRequired()
            .HasColumnType("integer");

        builder.Property(o => o.Status)
            .IsRequired()
            .HasColumnType("integer")
            .HasConversion<int>()
            .HasDefaultValue(OrderStatus.Confirmed);

        builder.Property(o => o.DateCreated)
            .IsRequired()
            .HasColumnType("timestamp with time zone")
            .HasDefaultValueSql("now() at time zone 'UTC'");
    }
}