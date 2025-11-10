namespace Utilities.Handlers;

using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Utilities.Logging.Static;

public sealed class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        Logger.LogException(exception);

        httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        httpContext.Response.ContentType = "application/json";

        var errorResponse = new
        {
            statusCode = HttpStatusCode.InternalServerError,
            message = "An internal server error occurred. Please try again later.",
            errorId = httpContext.TraceIdentifier,
            exceptionType = exception.GetType().Name,

            details = httpContext.RequestServices
                .GetService<IWebHostEnvironment>()?
                .IsDevelopment() == true ? exception.Message : null,
        };

        await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);

        return true;
    }
}
