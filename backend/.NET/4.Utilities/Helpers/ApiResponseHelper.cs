namespace Utilities.Helpers;

using Microsoft.AspNetCore.Mvc;
using Utilities.Results;

public static class ApiResponseHelper
{
    public static ActionResult<Result<T>> ResponseOutcome<T>(Result<T> result, ControllerBase controller)
        => result switch
        {
            { ErrorResult: Enums.ErrorResults.ValidationError, Data: null } and { HasError: false } => controller.NotFound(result),
            { HasError: true } => controller.StatusCode(500, result),
            { ErrorResult: Enums.ErrorResults.GeneralError } => controller.BadRequest(result),
            _ => controller.Ok(result)
        };

    public static ActionResult<Result<IEnumerable<T>>> ResponseOutcome<T>(Result<IEnumerable<T>> result, ControllerBase controller)
        => result switch
        {
            { HasError: true } => controller.StatusCode(500, result),
            { ErrorResult: Enums.ErrorResults.GeneralError } => controller.BadRequest(result),
            _ => controller.Ok(result)
        };

    public static ActionResult<Result> ResponseOutcome(Result result, ControllerBase controller)
        => result switch
        {
            { HasError: true } => controller.StatusCode(500, result),
            { ErrorResult: Enums.ErrorResults.GeneralError } => controller.BadRequest(result),
            _ => controller.Ok(result)
        };
}
