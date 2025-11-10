namespace Core.Orders.V1.Commands;

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        this.RuleFor(x => x.PizzaId).NotEmpty().NotNull()
            .WithMessage("Pizza is required");

        this.RuleFor(x => x.CustomerName).NotEmpty().NotNull()
            .WithMessage("Customer name is required");

        this.RuleFor(x => x.CustomerEmail).NotEmpty()
            .WithMessage("Customer email is required")
            .EmailAddress()
            .WithMessage("Customer email must be a valid email address");
    }
}
