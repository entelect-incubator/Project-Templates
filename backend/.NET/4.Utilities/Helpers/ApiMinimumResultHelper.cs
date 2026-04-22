namespace Utilities.Helpers;

using Microsoft.AspNetCore.Http;
using Utilities.Enums;
using Utilities.Results;

public static class ApiMinimalResultHelper
{
    public static IResult Outcome<T>(Result<T> result)
        => result switch
        {
            { ErrorResult: ErrorResults.ValidationError, Data: null } and { IsSuccess: true } => Results.NotFound(result),
            { IsSuccess: false } => Results.StatusCode(500),
            { ErrorResult: ErrorResults.GeneralError } => Results.BadRequest(result),
            _ => Results.Ok(result)
        };

    public static IResult Outcome(Result result)
        => result switch
        {
            { IsSuccess: false } => Results.StatusCode(500),
            { ErrorResult: ErrorResults.ValidationError } => Results.BadRequest(result),
            _ => Results.Ok(result)
        };
}
