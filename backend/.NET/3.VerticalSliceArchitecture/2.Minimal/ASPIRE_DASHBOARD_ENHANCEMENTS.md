# Aspire Enhancements & OpenAPI Client Generator

## Overview

This update adds three major features:

1. **Database Seeding & Cleaning** - Programmatic API endpoints for data management
2. **Aspire Dashboard Integration** - Menu actions in Aspire dashboard for common tasks
3. **OpenAPI Client Generator** - Console app to generate API clients for multiple languages

---

## Feature 1: Database Seeding & Cleaning

### New DatabaseSeeding Methods

#### `SeedAsync(IServiceProvider)`
Programmatically seeds sample pizza data if the database is empty.

```csharp
// Call from Aspire or other automation
await DatabaseSeeding.SeedAsync(app.Services);
```

#### `CleanDataAsync(IServiceProvider, bool requireConfirmation)`
Cleans all pizza and order data with optional confirmation.

```csharp
// Interactive mode (requires user confirmation)
var success = await DatabaseSeeding.CleanDataAsync(app.Services, requireConfirmation: true);

// Automated mode (no confirmation)
var success = await DatabaseSeeding.CleanDataAsync(app.Services, requireConfirmation: false);
```

### Admin API Endpoints

New endpoints available at `/api/v1/admin`:

#### Seed Data
```http
POST /api/v1/admin/seed
```
**Response:**
```json
{
  "message": "Database seeded successfully",
  "timestamp": "2024-01-15T14:30:45.123Z"
}
```

#### Clean Data
```http
POST /api/v1/admin/clean
```
**Response:**
```json
{
  "message": "Database cleaned successfully",
  "timestamp": "2024-01-15T14:30:45.123Z"
}
```

### Integration with Api.Startup

The admin endpoints are registered automatically:

```csharp
public static void RegisterMiddlewares(this WebApplication app)
{
    // ... existing code ...
    app.MapAdminEndpoints();  // Registers /api/v1/admin endpoints
}
```

---

## Feature 2: Aspire Dashboard Integration

### What Changed

1. **ClientGenerator App Added** - New console app visible in Aspire dashboard
2. **API Endpoints Exposed** - Admin endpoints for seed/clean operations
3. **Resource Display** - Dashboard shows all resources with menu actions

### How to Use

#### From Aspire Dashboard

1. Start Aspire: `dotnet run --project AspireHost`
2. Open dashboard: `https://localhost:18888`
3. Click **"Api"** resource
4. Click ellipsis menu (`?`) 
5. Available actions:
   - **Seed Data** - Populate with 8 sample pizzas
   - **Clean Data** - Remove all data with confirmation

#### From Command Line

While Aspire is running:

```bash
# Seed database
curl -X POST https://localhost:5001/api/v1/admin/seed

# Clean database  
curl -X POST https://localhost:5001/api/v1/admin/clean
```

#### From Code

```csharp
// In your application
var serviceProvider = app.Services;

// Seed data
await DatabaseSeeding.SeedAsync(serviceProvider);

// Clean data with confirmation
var result = await DatabaseSeeding.CleanDataAsync(serviceProvider, requireConfirmation: true);
```

---

## Feature 3: OpenAPI Client Generator

### Project Structure

```
ClientGenerator/
??? ClientGenerator.csproj  # Project file
??? Program.cs              # CLI implementation
??? README.md              # Detailed documentation
```

### Installation

The project is already part of the solution. No additional setup needed.

### CLI Commands

#### Generate All Clients

```bash
cd ClientGenerator
dotnet run -- all \
  -s https://localhost:5001/swagger/v1/swagger.json \
  -o ../generated-clients
```

#### Generate C# Client Only

```bash
dotnet run -- csharp \
  -s https://localhost:5001/swagger/v1/swagger.json \
  -o ../Api.Client \
  -n "MyApp.Api.Client"
```

#### Generate TypeScript Client (React)

```bash
dotnet run -- typescript \
  -s https://localhost:5001/swagger/v1/swagger.json \
  -o ../frontend/src/api \
  -f react
```

#### Generate TypeScript Client (Angular)

```bash
dotnet run -- typescript \
  -s https://localhost:5001/swagger/v1/swagger.json \
  -o ../frontend/src/services \
  -f angular
```

### Generated Output Structure

```
generated-clients/
??? csharp/
?   ??? ApiClient.cs              # C# client
?       ??? PizzaClient
?       ??? OrderClient
?       ??? AdminClient
??? typescript/
    ??? api-client.ts             # TypeScript client
        ??? PizzaClient
        ??? OrderClient
        ??? AdminClient
```

### Usage Examples

#### C# Client

```csharp
using MyApp.Api.Client;

var client = new ApiClient("https://api.example.com", httpClient);

// Get all pizzas
var pizzas = await client.PizzaClient.SearchAsync(...);

// Create pizza
var result = await client.PizzaClient.CreateAsync(
    new CreatePizzaCommand { Name = "Supreme" }
);

// Admin operations
await client.AdminClient.SeedAsync();
await client.AdminClient.CleanAsync();
```

#### TypeScript/React

```typescript
import { ApiClient } from './api/api-client';

const client = new ApiClient('https://api.example.com');

// Get all pizzas
const pizzas = await client.pizzaClient.search(...);

// Create pizza
const result = await client.pizzaClient.create({
  name: 'Supreme'
});

// Admin operations
await client.adminClient.seed();
await client.adminClient.clean();
```

---

## Workflow: End-to-End

### Scenario: Development with Seed Data

```bash
# 1. Start Aspire
dotnet run --project AspireHost

# 2. Dashboard opens at https://localhost:18888

# 3. Click Api ? Menu ? Seed Data
# ? Database populated with 8 pizzas

# 4. Generate TypeScript client for React
cd ClientGenerator
dotnet run -- typescript \
  -s https://localhost:5001/swagger/v1/swagger.json \
  -o ../frontend/src/api \
  -f react

# 5. Use in React component
# ? ApiClient ready with type safety
```

### Scenario: Production Deployment

```bash
# 1. Deploy API to production
# 2. Get production swagger URL
PROD_URL="https://api.production.com/swagger/v1/swagger.json"

# 3. Generate client for React SPA
dotnet run -- typescript -s "$PROD_URL" -o ../spa/src/api -f react

# 4. Generate client for C# backend
dotnet run -- csharp -s "$PROD_URL" -o ../backend/Client -n "Company.API.Client"

# 5. No manual client code needed! ?
```

---

## Architecture

### Aspire Setup

```
AspireHost
??? Api (Docker + PostgreSQL)
?   ??? /api/v1/pizzas (endpoints)
?   ??? /api/v1/orders (endpoints)
?   ??? /api/v1/admin/seed (seed endpoint)
?   ??? /api/v1/admin/clean (clean endpoint)
??? ClientGenerator (Console App)
?   ??? CLI for generating clients
??? PostgreSQL (Database)
    ??? pizzadb
```

### Data Flow

```
Aspire Dashboard
    ?
Menu Action (Seed/Clean)
    ?
HTTP POST to /api/v1/admin/seed or /clean
    ?
Api.Infrastructure.DatabaseSeeding
    ?
PostgreSQL Database
    ?
? Complete
```

### Client Generation Flow

```
OpenAPI Spec (Swagger JSON)
    ?
ClientGenerator (Console App)
    ?
NSwag Libraries
    ?? C# Generator
    ?? TypeScript Generator
    ?? Parsing
    ?
Generated Client Code
    ?? ApiClient.cs
    ?? api-client.ts
    ?
Use in Your Project
```

---

## Files Added/Modified

### New Files

| File | Purpose |
|------|---------|
| `ClientGenerator/Program.cs` | CLI entry point for OpenAPI generation |
| `ClientGenerator/ClientGenerator.csproj` | Project file with NSwag dependencies |
| `ClientGenerator/README.md` | Detailed client generator documentation |
| `Api/Endpoints/V1/Admin/SeedDataEndpoint.cs` | Admin endpoints for seed/clean |

### Modified Files

| File | Change |
|------|--------|
| `Api/Infrastructure/DatabaseSeeding.cs` | Added `SeedAsync()` and `CleanDataAsync()` |
| `AspireHost/Program.cs` | Added ClientGenerator project + endpoint config |

---

## Quick Start

### 1. Start Everything

```bash
# Terminal 1: Run Aspire
dotnet run --project AspireHost

# Terminal 2: Generate clients (while Aspire runs)
cd ClientGenerator
dotnet run -- all -s https://localhost:5001/swagger/v1/swagger.json
```

### 2. Use Aspire Dashboard

- Open: https://localhost:18888
- Select **Api** resource
- Click ellipsis menu (`?`)
- Choose **Seed Data** or **Clean Data**

### 3. Use Generated Clients

- C# client: Copy `ApiClient.cs` to your project
- TypeScript: Import in React/Angular app

---

## Advanced Usage

### Batch Generate Clients for Multiple APIs

```bash
# Create a script: generate-all-clients.sh

for API in "api1" "api2" "api3"; do
  dotnet run -- all \
    -s "https://$API.example.com/swagger/v1/swagger.json" \
    -o "../clients/$API"
done
```

### CI/CD Integration

```yaml
# .github/workflows/generate-clients.yml
name: Generate Clients

on: [push]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 10.0.x
      
      - name: Generate C# Client
        run: |
          cd ClientGenerator
          dotnet run -- csharp \
            -s https://api.prod.example.com/swagger/v1/swagger.json \
            -o ../generated-clients/csharp
      
      - name: Commit & Push
        run: |
          git add generated-clients/
          git commit -m "chore: regenerate API clients"
          git push
```

---

## Testing

### Test Seeding

```bash
curl -X POST https://localhost:5001/api/v1/admin/seed \
  -H "Content-Type: application/json"

# Should return:
# { "message": "Database seeded successfully", "timestamp": "..." }
```

### Test Cleaning

```bash
curl -X POST https://localhost:5001/api/v1/admin/clean \
  -H "Content-Type: application/json"

# Should return:
# { "message": "Database cleaned successfully", "timestamp": "..." }
```

### Verify Generated Client

```bash
# C#
dotnet add ../Api.Client reference ClientGenerator
# Check ApiClient.cs is present and compiles

# TypeScript
npm install
npm run build
# Check api-client.ts is generated and no errors
```

---

## Troubleshooting

### "ClientGenerator not found in Aspire"

Make sure:
1. `ClientGenerator.csproj` exists in solution root
2. AspireHost references it: `builder.AddProject<ClientGenerator>(...)`
3. Rebuild solution

### "OpenAPI URL not accessible"

```bash
# Ensure API is running
dotnet run --project Api

# Verify URL
curl https://localhost:5001/swagger/v1/swagger.json

# If SSL error, disable validation (dev only)
export NODE_TLS_REJECT_UNAUTHORIZED=0
```

### "Database clean failed"

1. Ensure API is running
2. Check database connection
3. Verify PostgreSQL is accessible

---

## Future Enhancements

- [ ] Scheduled seeding via recurring job
- [ ] Database backup before clean operation
- [ ] Metrics tracking for admin operations
- [ ] Support for Java/Go client generation
- [ ] Custom client templates
- [ ] Async client operation queue

---

**Status:** ? **COMPLETE**  
**Features Added:** ? **3**  
**Ready to Use:** ? **YES**
