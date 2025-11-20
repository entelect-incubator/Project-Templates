# Kestrel Port Configuration - Complete Guide

## Quick Answer to Your Questions

### 1. Does the hardcoded port need to match launchSettings.json?
**No.** They serve different purposes:
- **launchSettings.json** - Used ONLY by `dotnet run` in development
- **Program.cs Kestrel config** - Used in ALL environments (dev, staging, prod, docker, etc.)

### 2. Can the port be read from settings instead of hardcoding?
**Yes!** Multiple approaches:
1. ✅ Read from `appsettings.json`
2. ✅ Read from environment variables
3. ✅ Read from `IConfiguration`
4. ✅ Use custom configuration classes

### 3. Is there a better way?
**Yes!** Use environment-based configuration with fallbacks:

```csharp
builder.WebHost.ConfigureKestrel((context, options) =>
{
    // Priority: Environment Variable > appsettings > Default
    var port = int.Parse(
        context.Configuration["Kestrel:Port"] ?? "5000"
    );
    
    options.ListenAnyIP(port, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
});
```

---

## When You Run `dotnet run`

The priority is:
1. **Environment variables** (highest)
2. **appsettings.{Environment}.json** 
3. **appsettings.json**
4. **Default in code** (lowest)

**launchSettings.json does NOT affect any of this** - it only sets environment variables for the dotnet CLI.

---

## Best Practice Implementation

### Step 1: Update Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();

// ✅ Read port from configuration
builder.WebHost.ConfigureKestrel((context, options) =>
{
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

### Step 2: Update appsettings.json

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

### Step 3: Environment-Specific Settings

**appsettings.Development.json**
```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

**appsettings.Production.json**
```json
{
  "Kestrel": {
    "Port": 80
  }
}
```

### Step 4: Docker/Deployment

```bash
# Override via environment variable
docker run -e Kestrel__Port=8080 myapp
```

---

## How It Works

```
When you run: dotnet run

1. appsettings.json loaded (default)
   ↓
2. appsettings.Development.json merged on top
   ↓
3. Environment variables from launchSettings.json applied
   ↓
4. Program.cs reads config (gets the merged result)
   ↓
5. Kestrel starts on configured port
```

---

## Configuration Examples

### Example 1: Simple Development

**appsettings.json**
```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

**Run locally:**
```bash
dotnet run  # Uses port 5000
```

### Example 2: Multiple Environments

**appsettings.json** (default/development)
```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

**appsettings.Production.json**
```json
{
  "Kestrel": {
    "Port": 80
  }
}
```

**Deploy to production:**
```bash
docker run -e ASPNETCORE_ENVIRONMENT=Production myapp
# Reads appsettings.Production.json → port 80
```

### Example 3: Runtime Override

```bash
# Override any setting via environment variable
dotnet run
# Set env var first
export Kestrel__Port=8080
dotnet run  # Now uses port 8080

# Or one-liner
Kestrel__Port=8080 dotnet run
```

---

## What About launchSettings.json?

**You can keep it as-is.** It doesn't conflict:

```json
{
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

- Port 7160/5160 in launchSettings = Used by IIS Express debugging
- Port in appsettings.json = Used by Kestrel (what your code runs)
- Both can coexist without conflict

---

## Advanced: Multiple Endpoints

```csharp
builder.WebHost.ConfigureKestrel((context, options) =>
{
    var httpPort = int.Parse(context.Configuration["Kestrel:HttpPort"] ?? "5000");
    var httpsPort = int.Parse(context.Configuration["Kestrel:HttpsPort"] ?? "5001");
    var enableHttps = context.Configuration.GetValue<bool>("Kestrel:EnableHttps", false);
    
    // HTTP endpoint
    options.ListenAnyIP(httpPort, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
    
    // HTTPS endpoint (if enabled)
    if (enableHttps)
    {
        options.ListenAnyIP(httpsPort, listenOptions =>
        {
            listenOptions.UseHttps();
            listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
        });
    }
});
```

**appsettings.json**
```json
{
  "Kestrel": {
    "HttpPort": 5000,
    "HttpsPort": 5001,
    "EnableHttps": false
  }
}
```

**appsettings.Production.json**
```json
{
  "Kestrel": {
    "HttpPort": 80,
    "HttpsPort": 443,
    "EnableHttps": true
  }
}
```

---

## Summary Table

| Scenario             | Configuration File           | Environment Variable | Result            |
| -------------------- | ---------------------------- | -------------------- | ----------------- |
| Local development    | appsettings.Development.json | None                 | Port from JSON    |
| Production in Docker | appsettings.Production.json  | Kestrel__Port=80     | Port from env var |
| Quick override       | -                            | Kestrel__Port=8080   | Port 8080         |
| Unit tests           | -                            | None                 | Default 5000      |

---

## Recommendation

Use this template for all your projects:

```csharp
// Program.cs
builder.WebHost.ConfigureKestrel((context, options) =>
{
    var port = int.Parse(context.Configuration["Kestrel:Port"] ?? "5000");
    
    options.ListenAnyIP(port, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
});
```

Then manage ports in `appsettings.{Environment}.json` - No hardcoding needed! ✅
