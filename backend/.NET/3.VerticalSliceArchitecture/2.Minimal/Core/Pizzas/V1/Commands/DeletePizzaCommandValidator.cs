namespace Core.Pizzas.V1.Commands;

public class DeletePizzaCommandValidator : AbstractValidator<DeletePizzaCommand>
{
    public DeletePizzaCommandValidator()
    {
        this.RuleFor(x => x.Id).NotEmpty().NotNull()
            .WithMessage("Pizza Id is required");
    }
}
