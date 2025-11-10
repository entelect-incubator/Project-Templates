namespace Core.V1.Pizzas.Commands;
public class CreatePizzaCommandValidator : AbstractValidator<CreatePizzaCommand>
{
    public CreatePizzaCommandValidator()
    {
        this.RuleFor(r => r.Model.Name)
            .MaximumLength(200)
            .NotEmpty();
    }
}
