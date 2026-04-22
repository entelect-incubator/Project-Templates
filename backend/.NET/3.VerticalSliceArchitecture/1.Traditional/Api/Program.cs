namespace Api;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using OpenTelemetry.Logs;
using Serilog;
using Utilities.Logging.Static;

public class Program
{
    public static void Main(string[] args)
    {
        Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) => Host.CreateDefaultBuilder(args)
        .ConfigureLogging(logging =>
        {
            logging.AddOpenTelemetry(otel =>
                otel.AddOtlpExporter(options => options.Endpoint = new Uri("https://localhost:21007")));
        })
        .ConfigureWebHostDefaults(b => b.UseStartup<Startup>())
        .UseSerilog();
}
