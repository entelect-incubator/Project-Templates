namespace Core.Pizzas.V1.Commands;

public sealed class CreatePizzaCommandValidator : AbstractValidator<CreatePizzaCommand>
{
    public CreatePizzaCommandValidator()
    {
        this.RuleFor(r => r.Name)
            .MaximumLength(200)
            .NotEmpty();
    }
}
