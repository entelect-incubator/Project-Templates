# Aspire & OpenTelemetry Setup Guide

## Overview

Aspire provides a unified way to manage .NET cloud applications with integrated observability through OpenTelemetry. This guide explains how to run the Pizza Tracker application with Aspire for development and debugging.

## Quick Start

### Option 1: Standalone API (No Aspire)

For simple development without telemetry:

```bash
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/Api
dotnet run
```

**API Endpoint:** `https://localhost:5001`

Update `.env` in the frontend:

```bash
VITE_API_BASE_URL=https://localhost:5001
```

### Option 2: With Aspire (Recommended for Development)

Aspire provides centralized observability, health checks, and service orchestration.

#### Prerequisites

- .NET 9.0 or later
- Visual Studio 2022 (17.5+) or VS Code with C# extension
- Aspire workload installed

#### Install Aspire Workload

```bash
dotnet workload restore
dotnet workload install aspire
```

#### Run Aspire Host

```bash
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/AspireHost
dotnet run
```

**Aspire Dashboard:** `http://localhost:15258`

The dashboard provides:

- 📊 Real-time metrics
- 📈 Performance traces
- 🔍 Request/response details
- 💾 Structured logging
- ❤️ Health status

#### Update Frontend for Aspire

When running with Aspire, the API is available at `http://localhost:5000` (not https):

```bash
cp frontend/React/template/.env.example frontend/React/template/.env
```

Edit `.env`:

```bash
# Use HTTP when running Aspire (it handles HTTPS internally)
VITE_API_BASE_URL=http://localhost:5000
```

#### Run Frontend

In a separate terminal:

```bash
cd frontend/React/template
npm install
npm run dev
```

**Frontend:** `http://localhost:5173`

## Architecture Templates

Each template supports Aspire:

### 1. Layered Architecture

```bash
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/AspireHost
dotnet run
```

### 2. Clean Architecture

```bash
cd backend/.NET/2.CleanArchitecture/AspireHost
dotnet run
```

### 3. Vertical Slice Architecture

```bash
cd backend/.NET/3.VerticalSliceArchitecture/2.Minimal/AspireHost
dotnet run
```

## OpenTelemetry Integration

### Automatic Instrumentation

Aspire automatically instruments:

- **HTTP requests** - Request/response timing, status codes
- **Database queries** - Query performance, connection details
- **Middleware** - Routing, authentication, error handling
- **Service dependencies** - External service calls

### Custom Spans

Add custom telemetry in your code:

```csharp
using System.Diagnostics;

public class MyService
{
    private static readonly ActivitySource ActivitySource = new("MyApp");

    public void DoWork()
    {
        using (var activity = ActivitySource.StartActivity("DoingWork"))
        {
            activity?.SetTag("work.type", "import");
            // Your code here
        }
    }
}
```

### View Traces

1. Open Aspire Dashboard: `http://localhost:15258`
2. Go to "Traces" tab
3. Click on any request to see detailed breakdown
4. View custom spans and events

## Configuration

### Aspire Settings

Located in each project's `appsettings.Development.json` and `Program.cs`:

```csharp
// In Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add Aspire observability
builder.AddServiceDefaults();
builder.AddDefaultOpenApi();

var app = builder.Build();

app.MapDefaultEndpoints();
```

### OTLP Endpoint

By default, Aspire uses:

- **OTLP Endpoint:** `http://localhost:4317` (gRPC)
- **Metrics:** Sent every 30 seconds
- **Traces:** Real-time streaming

Override in `appsettings.Development.json`:

```json
{
  "ASPIRE_TELEMETRY_ENABLED": true,
  "OTEL_EXPORTER_OTLP_ENDPOINT": "http://localhost:4317"
}
```

## Using Aspire for Testing & Debugging

### Debugging Performance Issues

1. Run with Aspire
2. Reproduce the issue
3. Check Aspire Dashboard:
   - **Traces Tab:** See slow requests
   - **Metrics Tab:** Monitor CPU, memory
   - **Logs Tab:** Search for errors or warnings

### Load Testing with Aspire

For load testing with observability:

```bash
# Terminal 1: Run Aspire
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/AspireHost
dotnet run

# Terminal 2: Run frontend
cd frontend/React/template
npm run dev

# Terminal 3: Run k6 benchmark
cd backend/.NET
k6 run K6_BENCHMARKING.md
```

View real-time metrics in Aspire Dashboard while load test runs.

## Production Considerations

### Disable Aspire in Production

Aspire dashboard should NOT run in production. Instead, use:

- **Azure Application Insights**
- **Datadog**
- **New Relic**
- **Grafana Cloud**

### Export to Production OTLP

Configure production OTLP endpoint:

```json
{
  "OTEL_EXPORTER_OTLP_ENDPOINT": "https://your-observability-platform.com"
}
```

## Troubleshooting

### Aspire Dashboard Not Accessible

**Issue:** Can't reach `http://localhost:15258`

**Solutions:**

- Ensure AspireHost is running
- Check firewall allows localhost:15258
- Try `http://127.0.0.1:15258` instead

### API Returns 404

**Issue:** Frontend gets 404 when calling API

**Solutions:**

1. Verify `VITE_API_BASE_URL` matches running API port
2. Check Aspire Dashboard to see if API service is running
3. Look at "Resources" tab in dashboard for actual API endpoint

### HTTPS Certificate Errors

**Issue:** SSL certificate errors when using `https://localhost:5001`

**Solutions:**

- Trust .NET development certificate:

```bash
dotnet dev-certs https --trust
```

- Use HTTP when running Aspire (`http://localhost:5000`)

### High Memory Usage

Aspire Dashboard uses memory for trace/metric storage.

**Solutions:**

- Run lightweight Aspire (smaller data retention)
- Use sampling for high-traffic services
- Export to external observability platform

## Environment Variables

### Frontend (.env)

```bash
# Aspire API (HTTP)
VITE_API_BASE_URL=http://localhost:5000

# Standalone API (HTTPS)
VITE_API_BASE_URL=https://localhost:5001

# Logging
LOG_LEVEL=debug

# Error tracking
VITE_SHOW_ERROR_DETAILS=true
```

### Backend (appsettings.Development.json)

```json
{
  "ASPNETCORE_ENVIRONMENT": "Development",
  "ASPIRE_TELEMETRY_ENABLED": true,
  "ConnectionStrings": {
    "DefaultConnection": "Server=(local);Database=PizzaTracker;Integrated Security=true;"
  }
}
```

## Advanced Topics

### Custom Dashboard

View metrics with custom tools:

```bash
# Export metrics to CSV
curl http://localhost:8888/metrics > metrics.txt

# View in Grafana
# Configure Prometheus scrape: http://localhost:8888/metrics
```

### Service-to-Service Communication

Aspire handles service discovery automatically:

```csharp
// Services can reference each other
var weatherService = httpClient.GetStringAsync("http://weatherservice:8080/");
```

### Health Checks

Enable application health endpoint:

```csharp
app.MapHealthChecks("/health");
```

View in Aspire Dashboard under "Health" status.

## Resources

- **Official Documentation:** https://learn.microsoft.com/en-us/dotnet/aspire/
- **OpenTelemetry:** https://opentelemetry.io/
- **Samples:** https://github.com/dotnet/aspire/tree/main/samples
- **Community Packages:** https://www.nuget.org/packages?q=opentelemetry

## Getting Help

- Check Aspire Dashboard logs first
- Enable debug logging: `LOG_LEVEL=debug`
- Review .NET Application Insights documentation
- File issues: https://github.com/dotnet/aspire/issues

---

**Last Updated:** November 12, 2025
**Tested With:** .NET 9.0, Aspire 9.0
