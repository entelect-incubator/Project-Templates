namespace Api;

using OpenTelemetry.Logs;
using Serilog;
using Utilities.Logging.Static;

public class Program
{
    public static async Task Main(string[] args)
    {
        Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();

        var builder = WebApplication.CreateBuilder(args);

        builder.RegisterServices();

        // Configure OpenTelemetry logging to use Aspire's OTLP endpoint
        var otlpEndpoint = Environment.GetEnvironmentVariable("OTEL_EXPORTER_OTLP_ENDPOINT");
        if (!string.IsNullOrWhiteSpace(otlpEndpoint))
        {
            builder.Logging.AddOpenTelemetry(logging =>
            {
                logging.IncludeFormattedMessage = true;
                logging.IncludeScopes = true;
                logging.AddOtlpExporter();
            });
        }

        var app = builder.Build();

        app.RegisterMiddlewares();
        await app.RunAsync();
    }
}
