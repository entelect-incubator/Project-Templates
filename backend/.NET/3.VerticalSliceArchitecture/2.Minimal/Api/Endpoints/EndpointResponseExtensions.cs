namespace Api.Endpoints;

public static class EndpointResponseExtensions
{
    public static RouteHandlerBuilder WithStandardErrors(this RouteHandlerBuilder builder)
        => builder
            .Produces<ValidationErrorResult>(StatusCodes.Status400BadRequest, "application/json")
            .Produces<ErrorResult>(StatusCodes.Status500InternalServerError, "application/json");

    public static RouteHandlerBuilder WithNotFoundAndErrors(this RouteHandlerBuilder builder)
        => builder
            .Produces<NotFoundErrorResult>(StatusCodes.Status404NotFound, "application/json")
            .WithStandardErrors();
}
