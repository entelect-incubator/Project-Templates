namespace Utilities.Handlers;

using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Utilities.Logging.Static;

public sealed class ValidationExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not ValidationException validationException)
        {
            return false;
        }

        Logger.LogInfo("Validation failed for request {TraceId}: {FailureCount} errors", httpContext.TraceIdentifier, validationException?.Errors);

        httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        httpContext.Response.ContentType = "application/json";

        var validationErrors = validationException.Errors
            .GroupBy(x => x.PropertyName)
            .ToDictionary(
                g => g.Key,
                g => g.Select(x => x.ErrorMessage).ToArray());

        var problemDetails = new
        {
            type = "https://api.pezza.com/docs/errors/validation-failed",
            title = "Validation Failed",
            status = HttpStatusCode.BadRequest,
            detail = "One or more validation errors occurred.",
            traceId = httpContext.TraceIdentifier,
            errors = validationErrors,
        };

        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}
