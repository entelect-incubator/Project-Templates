namespace Infrastructure.Mapping;

using Domain.V1.Orders;
using Domain.V1.Pizzas;

public class OrderMap : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // table
        builder.ToTable("Order");

        // key
        builder.HasKey(t => t.Id);

        // properties
        builder.Property(t => t.Id)
            .IsRequired()
            .HasColumnName("ID")
            .HasColumnType("int")
            .ValueGeneratedOnAdd();

        builder.Property(t => t.CustomerName)
            .IsRequired()
            .HasColumnName("CustomerName")
            .HasColumnType("varchar(100)")
            .HasMaxLength(100);

        builder.Property(t => t.CustomerEmail)
            .IsRequired()
            .HasColumnName("CustomerEmail")
            .HasColumnType("varchar(200)")
            .HasMaxLength(200);

        builder.Property(t => t.PizzaId)
            .IsRequired()
            .HasColumnName("PizzaId")
            .HasColumnType("int");

        builder.Property(t => t.Status)
            .IsRequired()
            .HasColumnName("Status")
            .HasColumnType("int")
            .HasConversion<int>();

        builder.Property(t => t.DateCreated)
            .IsRequired()
            .HasColumnName("DateCreated")
            .HasColumnType("datetimeoffset");

        // relationships
        builder.HasOne<Pizza>()
            .WithMany()
            .HasForeignKey(o => o.PizzaId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}