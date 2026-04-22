namespace Api;

using Api.Services;
using Api.StartupApp.App;
using Api.StartupApp.Services;
using Domain;
using Infrastructure;

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
        services.AddSingleton<PizzaImageService>();

        services.AddCommon();
        services.AddSecurity();
        services.AddInfrastructure(this.ConfigRoot);
    }

    public void Configure(IApplicationBuilder app)
    {
        app.AddCommon();
        app.AddSecurity();
    }
}