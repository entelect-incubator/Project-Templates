namespace Core.Orders.V1.Commands;

public sealed class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        this.RuleFor(x => x.CustomerName)
            .NotEmpty()
            .WithMessage("Customer name is required")
            .MaximumLength(100)
            .WithMessage("Customer name must not exceed 100 characters");

        this.RuleFor(x => x.CustomerEmail)
            .NotEmpty()
            .WithMessage("Customer email is required")
            .EmailAddress()
            .WithMessage("Customer email must be a valid email address")
            .MaximumLength(255)
            .WithMessage("Customer email must not exceed 255 characters");

        this.RuleFor(x => x.PizzaId)
            .GreaterThan(0)
            .WithMessage("Pizza ID must be a positive integer");
    }
}