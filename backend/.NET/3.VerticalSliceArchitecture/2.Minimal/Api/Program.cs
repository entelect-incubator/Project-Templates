namespace Api;

using OpenTelemetry.Logs;
using Serilog;
using Utilities.Logging.Static;

public class Program
{
    public static void Main(string[] args)
    {
        Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();

        var builder = WebApplication.CreateBuilder(args);
        builder.RegisterServices();
        builder.Logging.AddOpenTelemetry(logging => logging.AddOtlpExporter(options => options.Endpoint = new Uri("https://localhost:21007")));
        var app = builder.Build();

        app.RegisterMiddlewares();
        app.Run();
    }
}
