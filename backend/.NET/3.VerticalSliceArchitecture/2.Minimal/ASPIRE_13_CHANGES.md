# Aspire 13 Changes & Upgrades

## ?? Recent Updates

This document summarizes the **Aspire 13 upgrade** for the Vertical Slice Minimal Template.

### Version History
- **v13.0** (Current) - Aspire 13, PostgreSQL, Auto-Seeding
- **v9.0** (Previous) - Basic Aspire 9, In-Memory Database

---

## ? What's New

### 1. Single-File AppHost
**File:** `AspireHost/Program.cs`

```csharp
using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithImageTag("17-alpine")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent);

var database = postgres.AddDatabase("pizzadb");

var api = builder.AddProject<Api>("Api")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();
```

? **Benefit:** Simpler, more readable Aspire configuration

### 2. PostgreSQL Integration
- Docker-based PostgreSQL (Alpine Linux)
- Persistent volume for data
- Automatic database and connection management
- Smart connection detection

? **Benefit:** Production-ready database setup

### 3. Automatic Database Seeding
**Files:** 
- `Api/Infrastructure/DatabaseSeeding.cs`
- `Api/Infrastructure/DatabaseConfiguration.cs`

```csharp
// Auto-seeds 8 sample pizzas on startup
// Interactive reset prompt in development
// Silent operation in production
```

? **Benefit:** Zero-configuration development experience

### 4. Smart Database Detection
The application automatically detects and uses:
1. Aspire-provided PostgreSQL connection
2. Local PostgreSQL on `localhost:5432`
3. In-memory database (fallback)

? **Benefit:** Works everywhere without configuration

---

## ?? Getting Started

### With Aspire (Recommended)
```bash
cd AspireHost
dotnet run
```

### Without Aspire
```bash
cd Api
dotnet run
```

### See Also
- **Quick Start Guide:** [QUICK_START.md](./QUICK_START.md)
- **Full Documentation:** [ASPIRE_13_UPGRADE.md](./ASPIRE_13_UPGRADE.md)

---

## ?? Sample Data

The application automatically seeds **8 pizzas** on first run:

```
? Successfully seeded 8 pizzas to the database.
?? Sample pizzas created:

   • Margherita [ACTIVE]
   • Pepperoni [ACTIVE]
   • Hawaiian [ACTIVE]
   • BBQ Chicken [ACTIVE]
   • Vegetarian [ACTIVE]
   • Four Cheese [ACTIVE]
   • Mushroom Truffle [ACTIVE]
   • Spicy Italian [DISABLED]
```

---

## ?? Database Options

### Option 1: Aspire + PostgreSQL (Recommended)
- Automatic Docker orchestration
- Persistent volume
- Production-ready setup
- Best for development with realistic database

### Option 2: Local PostgreSQL
- Requires PostgreSQL on `localhost:5432`
- Good for development/testing
- Can be reused across projects

### Option 3: In-Memory Database
- No setup required
- Perfect for quick testing
- Data lost on app restart

---

## ?? NuGet Packages Added

```bash
# AspireHost
dotnet add package Aspire.Hosting.PostgreSQL --version 13.0.0

# Api
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore --version 10.0.0
```

---

## ?? Modified Files

| File | Changes |
|------|---------|
| `AspireHost/Program.cs` | Single-file AppHost with PostgreSQL |
| `Api/Program.cs` | Database init & auto-seeding |
| `Api/Startup.cs` | DI setup with DB config |
| `Api/Api.csproj` | NuGet packages added |

---

## ?? New Files

| File | Purpose |
|------|---------|
| `Api/Infrastructure/DatabaseConfiguration.cs` | Connection detection logic |
| `Api/Infrastructure/DatabaseSeeding.cs` | Auto-seed pizzas |
| `QUICK_START.md` | 5-minute setup guide |
| `ASPIRE_13_UPGRADE.md` | Complete technical guide |
| `ASPIRE_13_UPGRADE_SUMMARY.md` | Executive summary |
| `OPENAPI_CLIENT_GENERATOR_PLAN.md` | Planned CLI tool |

---

## ?? Interactive Reset

When running in development with existing data:

```
?? Database already contains pizza data.
? Would you like to reset the database and reseed it? (y/n)
> y

?? Resetting database...
? Database reset successfully.
```

Type `y` to reset, `n` to keep existing data.

---

## ?? Aspire Dashboard

Access the dashboard when running Aspire:

```
Dashboard: http://localhost:15258
API:       http://localhost:5000
```

**Dashboard features:**
- ?? Resource status
- ?? Real-time metrics
- ?? Traces and spans
- ?? Structured logs
- ?? Health checks

---

## ?? Testing

```bash
# Run tests
dotnet test

# Run with Aspire
cd AspireHost
dotnet run

# Test API
curl http://localhost:5000/scalar/v1
```

---

## ?? Troubleshooting

**Docker not running?**
- Start Docker Desktop

**Port already in use?**
```bash
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux
```

**PostgreSQL connection failed?**
- Check Aspire Dashboard logs
- Restart Aspire Host

**Database already has data?**
- Answer `y` to interactive reset prompt

See [ASPIRE_13_UPGRADE.md](./ASPIRE_13_UPGRADE.md) for more troubleshooting.

---

## ?? Documentation

| Document | Purpose | Time |
|----------|---------|------|
| [QUICK_START.md](./QUICK_START.md) | 5-minute setup | 5 min |
| [ASPIRE_13_UPGRADE.md](./ASPIRE_13_UPGRADE.md) | Full technical guide | 20 min |
| [ASPIRE_13_UPGRADE_SUMMARY.md](./ASPIRE_13_UPGRADE_SUMMARY.md) | Quick overview | 10 min |
| [OPENAPI_CLIENT_GENERATOR_PLAN.md](./OPENAPI_CLIENT_GENERATOR_PLAN.md) | Future CLI tool | 10 min |

---

## ?? Next: OpenAPI Client Generator

**Planned Feature:** Interactive CLI for generating TypeScript/C# API clients

**Status:** ? Phase 2

See [OPENAPI_CLIENT_GENERATOR_PLAN.md](./OPENAPI_CLIENT_GENERATOR_PLAN.md) for details.

---

**Last Updated:** November 14, 2025  
**Aspire Version:** 13.0.0  
**.NET Version:** 10.0.0  
**Status:** ? Production Ready
