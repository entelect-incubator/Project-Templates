namespace Common;

public sealed class SettingsConfiguration
{
    public bool IsDev { get; set; } = true;

    public bool UseHttp3 { get; set; } = false;

    public int Port { get; set; } = 7160;

    public string OpenTelemetryExportUrl { get; set; }
}