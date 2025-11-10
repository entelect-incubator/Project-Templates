namespace Utilities.Models;

using System.Diagnostics.CodeAnalysis;

[ExcludeFromCodeCoverage]
public sealed class Error
{
    public required string ErrorCode { get; set; }

    public required string ErrorDescription { get; set; }
}
