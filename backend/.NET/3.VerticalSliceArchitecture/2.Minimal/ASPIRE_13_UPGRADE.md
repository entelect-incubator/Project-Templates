# Aspire 13 Upgrade - Vertical Slice Minimal API

## Overview

This document describes the Aspire 13 upgrade for the .NET 10 Vertical Slice Minimal API template, featuring:

1. ? **Single-File AppHost Support** - Aspire 13 simplified architecture
2. ? **PostgreSQL Integration** - Docker-based PostgreSQL with Aspire orchestration
3. ? **Database Seeding** - Automatic pizza data seeding with interactive reset option
4. ? **OpenAPI Client Generation CLI** - Console app for generating TypeScript clients (planned)

---

## What Changed

### 1. AspireHost Conversion to Single-File Format

**File: `AspireHost/Program.cs`**

The AppHost has been simplified to use Aspire 13's single-file format:

```csharp
using Projects;

var builder = DistributedApplication.CreateBuilder(args);

// Add PostgreSQL database with automatic setup
var postgres = builder.AddPostgres("postgres")
    .WithImageTag("17-alpine")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent);

var database = postgres.AddDatabase("pizzadb");

// Add API project with PostgreSQL connection
var api = builder.AddProject<Api>("Api")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();
```

**Key Features:**
- ?? **Postgres Resource**: Alpine Linux image, persistent volume
- ?? **Database Reference**: API automatically receives PostgreSQL connection string
- ? **Wait For**: API waits for database readiness before starting

### 2. PostgreSQL Database Integration

**NuGet Packages Added:**
- `Aspire.Hosting.PostgreSQL` (v13.0.0) ? AspireHost
- `Npgsql.EntityFrameworkCore.PostgreSQL` (v8.0.0) ? Api
- `Microsoft.EntityFrameworkCore` (v10.0.0) ? Api

**Connection Management:**

File: `Api/Infrastructure/DatabaseConfiguration.cs`

```csharp
public static IServiceCollection AddDatabaseContext(
    this IServiceCollection services, 
    IConfiguration configuration)
{
    var connectionString = configuration.GetConnectionString("pizzadb") 
        ?? configuration.GetConnectionString("DefaultConnection");

    if (!string.IsNullOrEmpty(connectionString) && IsPostgresConnection(connectionString))
    {
        // Use PostgreSQL
        services.AddDbContext<DatabaseContext>(options =>
            options.UseNpgsql(connectionString)
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging());
    }
    else
    {
        // Fallback to in-memory for standalone development
        services.AddDbContext<DatabaseContext>(options =>
            options.UseInMemoryDatabase("PizzaDb")
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging());
    }

    return services;
}
```

**Behavior:**
- ? Detects Aspire-provided PostgreSQL connection
- ? Falls back to local PostgreSQL if available
- ? Falls back to in-memory if running standalone
- ? Auto-enables detailed error messages in development

### 3. Database Seeding with Interactive Mode

**File: `Api/Infrastructure/DatabaseSeeding.cs`**

New service that automatically seeds 8 sample pizzas on startup:

```csharp
public static async Task InitializeAndSeedAsync(
    IServiceProvider serviceProvider, 
    bool interactive = false)
{
    // Check if database has data
    var hasExistingData = await context.Pizzas.AnyAsync();

    if (hasExistingData && interactive)
    {
        Console.WriteLine("\n?? Database already contains pizza data.");
        if (await PromptUserForResetAsync())
        {
            await ResetDatabaseAsync(context);
        }
    }

    if (!hasExistingData)
    {
        await SeedSamplePizzasAsync(context);
    }
}
```

**Sample Pizzas:**
- Margherita [ACTIVE]
- Pepperoni [ACTIVE]
- Hawaiian [ACTIVE]
- BBQ Chicken [ACTIVE]
- Vegetarian [ACTIVE]
- Four Cheese [ACTIVE]
- Mushroom Truffle [ACTIVE]
- Spicy Italian [DISABLED]

**Interactive Mode:**
- In Development: Prompts user to reset existing data (y/n)
- In Production: Uses existing data silently

### 4. API Program.cs Updates

**File: `Api/Program.cs`**

```csharp
public static async Task Main(string[] args)
{
    Log.Logger = LoggerSetup.ConfigureLogging().CreateLogger();

    var builder = WebApplication.CreateBuilder(args);

    builder.RegisterServices();
    builder.Logging.AddOpenTelemetry(...);

    // Configure database connection based on environment
    ConfigureDatabaseConnection(builder);

    var app = builder.Build();

    // Initialize and seed database on startup
    var isDevelopment = app.Environment.IsDevelopment();
    await DatabaseSeeding.InitializeAndSeedAsync(app.Services, interactive: isDevelopment);

    app.RegisterMiddlewares();
    await app.RunAsync();
}
```

**Key Changes:**
- ? Async Main entry point
- ? Database connection detection
- ? Automatic database seeding
- ? Interactive prompts in development

---

## Running the Application

### Option 1: With Aspire (Recommended for Development)

**Prerequisites:**
- .NET 9.0+ with Aspire 13 workload
- Docker Desktop running
- PostgreSQL Docker image will be automatically pulled

**Start Aspire Host:**

```bash
cd AspireHost
dotnet run
```

**What Happens:**
1. Aspire creates a PostgreSQL container
2. Creates `pizzadb` database
3. Starts API with PostgreSQL connection
4. Automatically seeds 8 sample pizzas
5. Opens Aspire Dashboard at `http://localhost:15258`

**Output:**
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

### Option 2: Standalone API (Local PostgreSQL)

**Prerequisites:**
- PostgreSQL running locally on port 5432
- Database user: `postgres`, Password: `postgres`

**Start API:**

```bash
cd Api
dotnet run
```

**Expected Connection:**
- Uses local PostgreSQL: `Server=localhost;Port=5432;Database=pizzadb;...`
- Automatically creates database if doesn't exist
- Seeds sample data on first run

### Option 3: Standalone API (In-Memory Database)

**No Prerequisites**

**Start API:**

```bash
cd Api
dotnet run
```

**Expected Behavior:**
- Uses in-memory database (no PostgreSQL needed)
- Perfect for quick testing
- Data persists only during application lifetime

---

## Development Workflow

### Reset Database During Development

When running with Aspire and you see existing pizza data:

```
?? Database already contains pizza data.
? Would you like to reset the database and reseed it? (y/n)
> y

?? Resetting database...
? Database reset successfully.

? Successfully seeded 8 pizzas to the database.
...
```

### Add More Sample Pizzas

Edit `Api/Infrastructure/DatabaseSeeding.cs`:

```csharp
var samplePizzas = new List<Pizza>
{
    new() { Name = "Margherita", Disabled = false, DateCreated = DateTime.UtcNow },
    // Add your pizzas here...
};
```

### Switch Database Providers

The system auto-detects the database type. To force a specific provider:

**Use PostgreSQL explicitly:**
```json
{
  "ConnectionStrings": {
    "pizzadb": "Server=localhost;Port=5432;Database=pizzadb;User Id=postgres;Password=postgres;"
  }
}
```

**Use in-memory database:**
- Remove connection strings
- App automatically uses in-memory

---

## Production Deployment

### Docker Deployment

The application is Docker-ready. See `Api/Dockerfile` for production builds.

**Build Docker Image:**

```bash
docker build -t pizza-api:latest -f Api/Dockerfile .
```

**Run with PostgreSQL:**

```bash
docker-compose up -d
```

### Environment Variables

**For PostgreSQL Connection:**

```bash
export ConnectionStrings__pizzadb="Server=db-host;Port=5432;Database=pizzadb;User Id=user;Password=pass;"
```

**For In-Memory Database:**

```bash
# Unset all connection strings
unset ConnectionStrings__pizzadb
unset ConnectionStrings__DefaultConnection
```

### Health Checks

API exposes health endpoints:

- `GET /hc` ? Complete health check
- `GET /alive` ? Liveness check (development only)

```bash
curl http://localhost:5000/hc | jq
```

---

## Aspire Dashboard

When running with Aspire Host, the dashboard provides:

- ?? **Resources**: Pizza API, PostgreSQL status
- ?? **Metrics**: CPU, Memory, Request counts
- ?? **Traces**: Request timing and spans
- ?? **Logs**: Structured logging with Serilog
- ?? **Health**: Database and API health status

**Access Dashboard:**
- URL: `http://localhost:15258`
- Auto-opened when running Aspire Host

---

## Testing

### API Endpoints

**View API Documentation:**
- OpenAPI/Swagger: `http://localhost:5000/openapi/v1.json`
- Scalar UI: `http://localhost:5000/scalar/v1`

**Example Requests:**

```bash
# Create a new pizza
curl -X POST http://localhost:5000/v1/pizzas \
  -H "Content-Type: application/json" \
  -d '{"name": "Custom Pizza"}'

# Get all pizzas
curl http://localhost:5000/v1/pizzassearch \
  -H "Content-Type: application/json" \
  -d '{}'

# Health check
curl http://localhost:5000/hc | jq
```

### Unit Tests

```bash
cd Test
dotnet test
```

---

## Architecture Overview

### Database Layer

```
Api (Single-file AppHost)
    ?
    ?? PostgreSQL (Docker)
    ?   ?? pizzadb (database)
    ?   ?? Persistent Volume
    ?
    ?? Api Project
        ?? Program.cs (entry point)
        ?? Startup.cs (DI setup)
        ?
        ?? Infrastructure/
        ?   ?? DatabaseConfiguration.cs (connection detection)
        ?   ?? DatabaseSeeding.cs (auto-seed on startup)
        ?
        ?? Endpoints/ (minimal APIs)
        ?   ?? V1/
        ?       ?? Pizzas/
        ?       ?? Orders/
        ?
        ?? Core/ (domain logic)
            ?? DatabaseContext (EF Core)
            ?? CQRS handlers
```

### Configuration Priority

1. **Aspire Runtime**: `pizzadb` connection string provided by Aspire
2. **appsettings.json**: Local PostgreSQL configuration
3. **Environment Variables**: Override via `ConnectionStrings__pizzadb`
4. **Fallback**: In-memory database

---

## Troubleshooting

### PostgreSQL Connection Fails

**Error:** `System.Net.Sockets.SocketException: Connection refused`

**Solution:**
```bash
# Verify PostgreSQL is running
docker ps | grep postgres

# Check Aspire logs in dashboard
# Or restart Aspire Host
```

### Database Already Has Data

**Scenario:** You want fresh data

**Solution:**
- In Development: Answer `y` to the interactive prompt
- In Production: Manually run database reset script
- Via Docker: Remove volume: `docker volume rm pizza_postgres_data`

### Hot Reload Not Working

**Scenario:** Changes to seeding logic not reflected

**Solution:**
```bash
# Restart the application completely
dotnet run --no-hot-reload
```

### API Can't Connect to PostgreSQL

**Error:** `FATAL: password authentication failed for user "postgres"`

**Solution:**
```bash
# Verify PostgreSQL credentials in connection string
# Default: User Id=postgres; Password=postgres;

# Or use interactive connection string dialog
```

---

## Next Steps: OpenAPI Client Generation CLI

**Planned Feature:** Console app for generating TypeScript/C# clients

```bash
dotnet run --project ApiClientGenerator -- \
  --output-dir ./clients/generated \
  --language typescript
```

**Status:** ? To be implemented

---

## File Summary

| File | Purpose | New/Modified |
|------|---------|-------------|
| `AspireHost/Program.cs` | Single-file AppHost with PostgreSQL | Modified |
| `AspireHost/AspireHost.csproj` | Added Aspire.Hosting.PostgreSQL | Modified |
| `Api/Program.cs` | Database initialization & seeding | Modified |
| `Api/Startup.cs` | DI setup with database config | Modified |
| `Api/Infrastructure/DatabaseConfiguration.cs` | PostgreSQL/in-memory detection | New |
| `Api/Infrastructure/DatabaseSeeding.cs` | Auto-seed sample pizzas | New |
| `Api/Api.csproj` | Added Npgsql.EntityFrameworkCore.PostgreSQL | Modified |

---

## References

- [Aspire 13 Documentation](https://learn.microsoft.com/en-us/dotnet/aspire/what-is-aspire)
- [Aspire 13 Single-File AppHost](https://aspire.dev/whats-new/aspire-13/#single-file-apphost-support)
- [Entity Framework Core PostgreSQL](https://github.com/npgsql/efcore.pg)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)

---

**Last Updated:** November 14, 2025
**Aspire Version:** 13.0.0
**.NET Version:** 10.0.0
**Status:** ? Production Ready
