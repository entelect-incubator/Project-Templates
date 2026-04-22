# Pizza Ordering App - .NET Aspire Orchestration

This directory contains the Aspire orchestration setup for the Pizza Ordering application, enabling coordinated development of the React frontend and .NET API.

## Overview

The Aspire host (`apphost.cs`) orchestrates:
- **Pizza API** (.NET 9): Vertical Slice Architecture API on `https://localhost:7160`
- **OpenTelemetry**: Observability and telemetry collection
- **Configuration**: Centralized settings for both frontend and backend

## Quick Start

### Prerequisites
- .NET 9 SDK or later
- Node.js 18+
- Visual Studio 2022 / VS Code with C# Dev Kit

### Running the Aspire Host

```bash
# From the frontend\React\Aspire directory
dotnet run
```

This will:
1. Start the .NET Pizza API service
2. Configure OpenTelemetry endpoint for tracing and metrics
3. Display the Aspire Dashboard at `https://localhost:17289` (once available)

### Running React Frontend

In a separate terminal:

```bash
# From the frontend\React directory  
npm run dev
```

The React app will be available at `http://localhost:3000`

### API Connectivity

The React frontend automatically connects to the API at:
```
https://localhost:7160
```

This is configured in `src/config/environment.ts` and will use the running Aspire-hosted API.

## Architecture

```
┌─────────────────────────────────────┐
│      React Frontend                 │
│      (Port 3000)                    │
│   - Pizza Menu Page                 │
│   - Shopping Cart Context           │
│   - Theme System (Dark/Light)       │
└────────────┬────────────────────────┘
             │ HTTP/HTTPS
             │
┌────────────▼────────────────────────┐
│      .NET Vertical Slice API        │
│      (Port 7160/7161)               │
│   - Pizza Endpoints (/v1/pizzas)    │
│   - Order Endpoints (/v1/orders)    │
│   - OpenTelemetry Integration       │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│    OpenTelemetry Collector          │
│    (Traces, Metrics, Logs)          │
│    OTLP Endpoint: Port 4317/4318    │
└─────────────────────────────────────┘
```

## Configuration

### apphost.cs
Defines the distributed application with:
- API service resource
- OpenTelemetry configuration
- Environment variables

### appsettings.json
Contains:
- Logging configuration
- Service URLs
- Observability settings

### appsettings.Development.json
Development-specific settings:
- Debug logging
- Console exporter for OpenTelemetry
- Development environment flags

## OpenTelemetry Setup

The API is configured to export telemetry to OpenTelemetry at:
```
https://localhost:21007
```

Key environment variables:
- `OTEL_EXPORTER_OTLP_PROTOCOL`: `http/protobuf`
- `OTEL_EXPORTER_OTLP_ENDPOINT`: Configured in apphost

## Troubleshooting

### API Connection Refused
- Ensure the Aspire host is running: `dotnet run` from this directory
- Check that port 7160 is not in use: `netstat -ano | findstr :7160`
- Verify SSL certificates are trusted (development certs)

### OpenTelemetry Not Collecting Data
- Confirm OTLP endpoint is reachable
- Check API logs for export errors
- Verify `ASPNETCORE_ENVIRONMENT` is set to `Development`

### React App Not Connecting
- Confirm API is running on https://localhost:7160
- Check browser console for CORS errors
- Verify `API_ENDPOINTS` in `src/config/environment.ts`

## Next Steps

- [ ] Configure Aspire Dashboard for telemetry visualization
- [ ] Add Seq for structured log aggregation
- [ ] Set up health checks for all services
- [ ] Add database service (SQL Server/PostgreSQL)
- [ ] Configure production deployment through Aspire

## References

- [.NET Aspire Documentation](https://learn.microsoft.com/en-us/dotnet/aspire/)
- [OpenTelemetry .NET](https://opentelemetry.io/docs/instrumentation/net/)
- [Vertical Slice Architecture](../../../backend/.NET/3.VerticalSliceArchitecture/README.md)
