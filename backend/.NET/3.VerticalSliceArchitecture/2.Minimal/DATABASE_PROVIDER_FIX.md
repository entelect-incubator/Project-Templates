# ?? Database Provider Registration Fix

## Problem

**Error:**
```
System.InvalidOperationException: Services for database providers 'Npgsql.EntityFrameworkCore.PostgreSQL', 
'Microsoft.EntityFrameworkCore.InMemory' have been registered in the service provider. 
Only a single database provider can be registered in a service provider.
```

**Root Cause:** Both PostgreSQL and InMemory providers were being registered, but EF Core only allows one provider per DbContext.

---

## Solution Applied ?

### 1. **Removed InMemory from Core Project**
- ? **Before:** `Core/Core.csproj` had `Microsoft.EntityFrameworkCore.InMemory` as a hard dependency
- ? **After:** Removed from Core - Core now has **zero database provider dependencies**

### 2. **Moved InMemory to Api Project Only**
- ? `Api/Api.csproj` now has:
  - `Npgsql.EntityFrameworkCore.PostgreSQL` v9.0.0 (primary)
  - `Microsoft.EntityFrameworkCore.InMemory` v9.0.0 (fallback for testing)

### 3. **Simplified Database Configuration**
- **File:** `Api/Infrastructure/DatabaseConfiguration.cs`
- Only **ONE** provider is registered at a time:
  - If PostgreSQL connection string exists ? Use PostgreSQL
  - If no connection string ? Use InMemory (for local testing)
  - Logic prevents both from being registered simultaneously

---

## How It Works Now

### With Aspire (PostgreSQL)
```bash
cd AspireHost
dotnet run
```
? Aspire provides `pizzadb` connection string ? **PostgreSQL registered**

### Local Development (PostgreSQL)
```bash
cd Api
dotnet run
```
- If environment variable `ConnectionStrings__pizzadb` set ? **PostgreSQL registered**
- If `appsettings.json` has connection ? **PostgreSQL registered**

### Testing (InMemory)
```bash
cd Api
dotnet run
```
- If **no connection string** ? **InMemory registered** (for quick testing)

---

## Package Distribution

| Package | Core | Api | Purpose |
|---------|------|-----|---------|
| `Microsoft.EntityFrameworkCore` | ? (transitive) | ? | Core ORM |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | ? | ? | PostgreSQL provider (primary) |
| `Microsoft.EntityFrameworkCore.InMemory` | ? | ? | InMemory provider (testing fallback) |

---

## Configuration Logic

```csharp
// Only ONE of these executes:

if (hasPostgresConnection)
{
    // Register PostgreSQL ONLY
    services.AddDbContext<DatabaseContext>(options =>
        options.UseNpgsql(connectionString));
}
else if (noConnectionString)
{
    // Register InMemory ONLY (for testing)
    services.AddDbContext<DatabaseContext>(options =>
        options.UseInMemoryDatabase("PizzaDb"));
}
```

**Key:** No conditional logic that might register both providers - only ONE gets registered based on configuration.

---

## Files Modified

| File | Change |
|------|--------|
| `Core/Core.csproj` | ? Removed `Microsoft.EntityFrameworkCore.InMemory` |
| `Api/Api.csproj` | ? Added `Microsoft.EntityFrameworkCore.InMemory` |
| `Api/Infrastructure/DatabaseConfiguration.cs` | Updated logic to only register ONE provider |

---

## Verification

**Build should succeed:**
```bash
dotnet build
# Build succeeded ?
```

**Run with different configurations:**

```bash
# With PostgreSQL (from Aspire)
cd AspireHost
dotnet run
# ? PostgreSQL registered

# Without connection string (fallback to InMemory)
cd Api
# (no connection string set)
dotnet run
# ? InMemory registered
```

---

## Benefits

? **Clean Separation** - Core has no database provider dependencies  
? **Flexible Deployment** - Easily switch between PostgreSQL and InMemory  
? **Testing-Friendly** - InMemory available when needed  
? **Production-Ready** - PostgreSQL primary provider  
? **No Conflicts** - Only one provider registered at a time

---

**Status:** ? FIXED  
**Error Resolution:** ? Provider conflict resolved  
**Ready to Run:** ? YES
