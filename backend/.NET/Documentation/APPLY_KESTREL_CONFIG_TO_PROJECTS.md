# Kestrel Port Configuration - Apply to Vertical Slice Minimal

## Your Current Code

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(7160, listenOptions => 
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3);
});
builder.RegisterServices();
```

## ✅ Updated Code (Recommended)

### In `Api/Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();

// ✅ BETTER - Read port from configuration instead of hardcoding
builder.WebHost.ConfigureKestrel((context, options) =>
{
    // Priority: config file > environment variable > default 5000
    var port = int.Parse(context.Configuration["Kestrel:Port"] ?? "5000");
    
    options.ListenAnyIP(port, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
});

builder.RegisterServices();
builder.Logging.AddOpenTelemetry(logging => 
    logging.AddOtlpExporter(options => 
        options.Endpoint = new Uri("https://localhost:21007")));

var app = builder.Build();
app.RegisterMiddlewares();
app.Run();
```

## Configuration Files

### `appsettings.json` (Development Default)

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

### `appsettings.Development.json`

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

### `appsettings.Production.json`

```json
{
  "Kestrel": {
    "Port": 80
  }
}
```

## How to Use

### Development (Local)

```bash
# Run with configuration file (port 5000 from appsettings.json)
dotnet run

# Or override with environment variable
Kestrel__Port=7160 dotnet run
```

### Production (Docker)

```bash
# Deploy with custom port
docker run -e Kestrel__Port=8080 myapp

# Deploy with environment-specific config
docker run -e ASPNETCORE_ENVIRONMENT=Production myapp
# Will use appsettings.Production.json (port 80)
```

## What About launchSettings.json?

**Keep it as-is - no changes needed:**

```json
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:7160"
    }
  },
  "profiles": {
    "Api": {
      "commandName": "Project",
      "launchBrowser": false,
      "applicationUrl": "https://localhost:7160;http://localhost:5160",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

The port (7160) in launchSettings.json doesn't conflict - it's only used for IIS Express debugging, not for your Kestrel configuration.

## Benefits of This Approach

✅ No hardcoding  
✅ Environment-aware (dev vs production)  
✅ Easy to override via environment variables  
✅ Works in Docker/Kubernetes  
✅ Works with CI/CD pipelines  
✅ Same port config pattern across all projects  

## Quick Verification

```bash
# Test locally
dotnet run
# Should output: Listening on: http://[::]:5000

# Test with override
Kestrel__Port=8080 dotnet run
# Should output: Listening on: http://[::]:8080

# Test in Docker
docker run -e Kestrel__Port=3000 myapp
# Should output: Listening on: http://[::]:3000
```

## Apply to All Projects

This same pattern should be applied to all 5 template projects:
- Layered Architecture / Clean Template
- Layered Architecture / Template With Data Access
- Clean Architecture
- Vertical Slice Architecture / Traditional
- Vertical Slice Architecture / Minimal ← Your project

---

**Status:** Ready to implement  
**Files to change:** 1 (Api/Program.cs) + 3 JSON config files  
**Breaking changes:** None - fully backward compatible
