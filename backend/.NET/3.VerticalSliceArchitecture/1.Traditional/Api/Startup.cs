namespace Api;

using Api.Services;
using Api.StartupApp.App;
using Api.StartupApp.Services;
using Features;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        this.ConfigRoot = configuration;
        this.ConfigRoot.Bind("Settings", new Settings());
    }

    public IConfiguration ConfigRoot
    {
        get;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCommon();
        services.AddSecurity();
        services.AddApplication();
        services.AddSingleton<PizzaImageService>();
    }

    public void Configure(IApplicationBuilder app)
    {
        app.AddCommon();
        app.AddSecurity();
    }
}