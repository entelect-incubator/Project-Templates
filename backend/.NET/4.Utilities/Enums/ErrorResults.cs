namespace Utilities.Enums;

using System.ComponentModel;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

[Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ErrorResults
{
    [Description("None")]
    None,

    [Description("Validation Error")]
    ValidationError,

    [Description("Not Found")]
    NotFound,

    [Description("Error")]
    GeneralError
}