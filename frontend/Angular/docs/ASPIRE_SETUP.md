# Development Setup

## Quick Start (Local Development)

Run both API and Angular services locally without Aspire orchestration:

```bash
npm run dev
```

This starts:
- **API**: `C:/Dev/Incubator/.NET-Template/backend/.NET/1.LayeredArchitecture/1. CleanTemplate/Api/Api.csproj` (port 5000/7160)
- **Angular**: `http://localhost:4200` (with proxy to API)

## Aspire Setup (Full Orchestration)

For full Aspire orchestration with dashboard and observability:

### Prerequisites
1. Install .NET Aspire workload:
   ```bash
   dotnet workload install aspire
   ```
2. Ensure Docker Desktop is running (required for DCP)

### Run Aspire

```bash
npm run aspire:simple
```

Or with logging to file:

```bash
npm run aspire
```

## Configuration

### Angular Proxy (api requests)
- **File**: `proxy.conf.js`
- **Routes** `/api/*` requests to the backend API
- **Aspire Integration**: Automatically receives API endpoint from Aspire environment variables (`services__pizzaapi__https__0` or `services__pizzaapi__http__0`)

### API Endpoint

- **Local Dev**: `http://localhost:5000` or `https://localhost:7160`
- **Aspire**: Auto-configured via service references

## Troubleshooting

### "DCP executable not found" Error
- Install Aspire workload: `dotnet workload install aspire`
- Ensure Docker Desktop is running
- Restart terminal after workload installation

### Angular PORT environment variable not set
- In Aspire mode: Set automatically by Aspire
- In local mode: Falls back to default ports (4200)

### API Connection Issues
- Verify API is running: Check console for startup messages
- Check proxy configuration: `proxy.conf.js`
- Verify CORS is enabled on API

## Architecture

```
┌─────────────────┐
│   Aspire Host   │ (.NET 10 file-based app)
├─────────────────┤
│  ┌───────────┐  │
│  │ Pizza API │  │ (.NET project)
│  └───────────┘  │
│  ┌───────────┐  │
│  │ Angular   │  │ (Vite app via npm)
│  └───────────┘  │
└─────────────────┘
```

**Packages Used**:
- `Aspire.Hosting.AppHost` 13.0.0
- `Aspire.Hosting.NodeJs` 9.5.2
- `CommunityToolkit.Aspire.Hosting.NodeJS.Extensions` 8.2.1
