# Database Migrations with DbUp

This guide explains how to use DbUp for managing database schema migrations in the .NET backend. DbUp provides versioning, tracking, and reliable deployment of database changes.

## Why DbUp?

DbUp offers several advantages over Entity Framework migrations:

- **Explicit Control** - SQL migrations are explicit and visible
- **Version Tracking** - Maintains schema version table for reliability
- **Simplicity** - Pure SQL with minimal ORM abstraction
- **Team Collaboration** - Easy to review SQL diffs in PRs
- **Production Confidence** - Battle-tested for complex scenarios

## Getting Started

### Installation

Add DbUp NuGet package:

```bash
dotnet add package DbUp
dotnet add package Npgsql  # for PostgreSQL
```

### Project Structure

Organize migrations in your project:

```
src/
├── Infrastructure/
│   ├── Data/
│   │   ├── Migrations/
│   │   │   ├── 20250104_140000_CreateUsersTable.sql
│   │   │   ├── 20250104_140100_CreateTodosTable.sql
│   │   │   └── 20250104_140200_AddIndexes.sql
│   │   └── DbMigrationRunner.cs
│   └── Configuration/
│       └── DatabaseConfiguration.cs
```

### Naming Convention

Migration files follow a strict naming pattern:

```
YYYYMMDD_HHmmss_DescriptiveName.sql
```

- **YYYYMMDD** - Date (year, month, day)
- **HHmmss** - Time (hours, minutes, seconds)
- **DescriptiveName** - Clear, PascalCase description of change
- Must be SQL files

Examples:
- `20250104_140000_CreateUsersTable.sql`
- `20250105_093000_AddEmailUniqueConstraint.sql`
- `20250105_100500_CreateTodosTable.sql`

## Implementation

### DbMigrationRunner.cs

Create a service to run migrations:

```csharp
using DbUp;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data;

public interface IDbMigrationRunner
{
    Task RunMigrationsAsync();
}

public class DbMigrationRunner : IDbMigrationRunner
{
    private readonly string _connectionString;
    private readonly ILogger<DbMigrationRunner> logger;

    public DbMigrationRunner(string connectionString, ILogger<DbMigrationRunner> logger)
    {
        _connectionString = connectionString;
        logger = logger;
    }

    public async Task RunMigrationsAsync()
    {
        try
        {
            logger.LogInformation("Starting database migrations...");

            var upgrader = DeployChanges.To
                .PostgresqlDatabase(_connectionString)
                .WithScriptsEmbeddedInAssembly(
                    typeof(DbMigrationRunner).Assembly,
                    scriptType => scriptType.Namespace == "Infrastructure.Data.Migrations")
                .LogToConsole()
                .Build();

            var result = upgrader.PerformUpgrade();

            if (!result.Successful)
            {
                logger.LogError("Database migration failed: {Error}", result.Error?.Message);
                throw new InvalidOperationException("Database migration failed", result.Error);
            }

            logger.LogInformation("Database migrations completed successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Database migration error");
            throw;
        }
    }
}
```

### Program.cs Integration

Register and run migrations on startup:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

// Add services
builder.Services.AddLogging(configure =>
{
    configure.AddConsole();
});

builder.Services.AddScoped<IDbMigrationRunner>(provider =>
    new DbMigrationRunner(
        connectionString,
        provider.GetRequiredService<ILogger<DbMigrationRunner>>()
    )
);

var app = builder.Build();

// Run migrations on startup
using (var scope = app.Services.CreateScope())
{
    var runner = scope.ServiceProvider.GetRequiredService<IDbMigrationRunner>();
    await runner.RunMigrationsAsync();
}

app.Run();
```

### AppDbContext.cs with Entity Framework

While DbUp handles schema migrations, use Entity Framework Core for application queries:

```csharp
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure entities (no migrations, just model mapping)
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Email).IsRequired();
            entity.Property(e => e.FirstName).IsRequired();
        });

        modelBuilder.Entity<Todo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired();
            entity.HasOne(e => e.User)
                .WithMany(u => u.Todos)
                .HasForeignKey(e => e.UserId);
        });
    }
}
```

## PostgreSQL Configuration

### Connection String

Configure PostgreSQL connection in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ProjectDb;Username=projectuser;Password=YourSecurePassword123!"
  }
}
```

### Environment-Specific Configuration

**Development (appsettings.Development.json):**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=ProjectDb_Dev;Username=projectuser;Password=dev_password"
  }
}
```

**Production (environment variable):**
```bash
export ConnectionStrings__DefaultConnection="Host=prod-server;Port=5432;Database=ProjectDb_Prod;Username=produser;Password=${PROD_DB_PASSWORD}"
```

### PostgreSQL Setup

Create database and user:

```sql
-- Connect as superuser
CREATE DATABASE "ProjectDb";

-- Create application user
CREATE USER projectuser WITH PASSWORD 'YourSecurePassword123!';

-- Grant privileges
GRANT CONNECT ON DATABASE "ProjectDb" TO projectuser;
GRANT USAGE ON SCHEMA public TO projectuser;
GRANT CREATE ON SCHEMA public TO projectuser;

-- Grant all privileges on tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO projectuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO projectuser;

-- Connect to database and grant existing table access
\c "ProjectDb"
GRANT ALL ON ALL TABLES IN SCHEMA public TO projectuser;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO projectuser;
```

## Writing Migrations

### Basic Table Creation

**File: 20250104_140000_CreateUsersTable.sql**

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Related Table with Foreign Key

**File: 20250104_140100_CreateTodosTable.sql**

```sql
CREATE TABLE todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_completed ON todos(completed);
```

### Adding Columns

**File: 20250105_093000_AddEmailVerificationToUsers.sql**

```sql
ALTER TABLE users ADD COLUMN email_verified BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;
```

### Creating Indexes

**File: 20250105_100000_CreateIndexes.sql**

```sql
-- Composite index for common query
CREATE INDEX idx_todos_user_completed 
    ON todos(user_id, completed);

-- Partial index for performance
CREATE INDEX idx_todos_incomplete 
    ON todos(user_id, created_at) 
    WHERE completed = FALSE;
```

### Modifying Constraints

**File: 20250105_110000_AddEmailConstraints.sql**

```sql
ALTER TABLE users 
    ADD CONSTRAINT ck_email_not_empty 
    CHECK (email != '' AND email ~ '^[^@]+@[^@]+\.[^@]+$');
```

## Migration Strategies

### Backward Compatibility

Write migrations that can be safely rolled back in development:

```sql
-- GOOD: Add with default, then make non-null
ALTER TABLE users ADD COLUMN nickname VARCHAR(100) DEFAULT '';
-- Later migration if needed:
-- ALTER TABLE users ALTER COLUMN nickname DROP DEFAULT;
-- ALTER TABLE users ALTER COLUMN nickname SET NOT NULL;

-- BAD: Add as NOT NULL without default
-- ALTER TABLE users ADD COLUMN nickname VARCHAR(100) NOT NULL; -- Fails if table has data
```

### Data Migrations

For data transformations, use separate migrations:

**File: 20250105_120000_MigrateUserNicknames.sql**

```sql
UPDATE users 
SET nickname = SUBSTRING(email, 1, POSITION('@' IN email) - 1)
WHERE nickname = '' OR nickname IS NULL;

ALTER TABLE users ALTER COLUMN nickname SET NOT NULL;
```

### Large Table Operations

For production safety with large tables:

```sql
-- Create new column without NOT NULL initially
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Populate in batches (application logic, not SQL)
-- UPDATE users SET full_name = CONCAT(first_name, ' ', last_name) 
--     WHERE id IN (SELECT id FROM users ORDER BY id LIMIT 1000);

-- After batch updates complete:
-- ALTER TABLE users ALTER COLUMN full_name SET NOT NULL;

-- Finally drop old columns after verification
-- ALTER TABLE users DROP COLUMN first_name, DROP COLUMN last_name;
```

## Seeding Data

Create a seed migration for initial data:

**File: 20250104_150000_SeedInitialData.sql**

```sql
INSERT INTO users (id, email, first_name, created_at, updated_at)
VALUES 
    ('550e8400-e29b-41d4-a716-446655440000', 'alice@example.com', 'Alice', NOW(), NOW()),
    ('550e8400-e29b-41d4-a716-446655440001', 'bob@example.com', 'Bob', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO todos (id, user_id, title, description, created_at, updated_at)
VALUES 
    ('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Welcome', 'Welcome to Todos', NOW(), NOW())
ON CONFLICT DO NOTHING;
```

## Common Operations

### List Applied Migrations

```csharp
var upgrader = DeployChanges.To
    .PostgresqlDatabase(connectionString)
    .Build();

var dbMigrationHistory = upgrader.GetExecutedScripts();
foreach (var script in dbMigrationHistory)
{
    Console.WriteLine($"Applied: {script}");
}
```

### Verify Migration Status

```csharp
var upgrader = DeployChanges.To
    .PostgresqlDatabase(connectionString)
    .Build();

var result = upgrader.PerformUpgrade();
Console.WriteLine($"Successful: {result.Successful}");
Console.WriteLine($"Scripts run: {result.Scripts.Count()}");
```

### Development: Drop and Recreate

For development environments only:

```csharp
// WARNING: This destroys all data. Development only!
public async Task ResetDatabaseAsync()
{
    var connection = new NpgsqlConnection(_connectionString);
    await connection.OpenAsync();
    
    var cmd = connection.CreateCommand();
    cmd.CommandText = "DROP SCHEMA public CASCADE; CREATE SCHEMA public;";
    await cmd.ExecuteNonQueryAsync();
    
    await connection.CloseAsync();
    
    // Then run migrations
    await RunMigrationsAsync();
}
```

## Best Practices

### Do's

✅ Write idempotent migrations when possible
✅ Keep migrations focused on a single change
✅ Test migrations in development first
✅ Include rollback strategy in migration comments
✅ Use meaningful, descriptive names
✅ Version control all migration files
✅ Run migrations in staging before production
✅ Document complex migrations in comments
✅ Use transactions for safety (DbUp default)

### Don'ts

❌ Don't mix multiple changes in one migration
❌ Don't manually apply changes bypassing DbUp
❌ Don't skip migrations in version control
❌ Don't use hardcoded connection strings in production
❌ Don't assume table order or schema state
❌ Don't drop columns/tables without backups
❌ Don't apply migrations without testing
❌ Don't use dynamic SQL without validation

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Database Migrations

on: [pull_request, push]

jobs:
  test-migrations:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:17-alpine
        env:
          POSTGRES_DB: ProjectDb_Test
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      
      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'
      
      - name: Build
        run: dotnet build
      
      - name: Run migrations
        env:
          ConnectionStrings__DefaultConnection: "Host=postgres;Database=ProjectDb_Test;Username=testuser;Password=testpass"
        run: dotnet run --project src/Api -- migrate
```

## Troubleshooting

### Migration Fails on Duplicate

**Error:** "Key (id)=(uuid) already exists"

**Solution:** Use `ON CONFLICT` in INSERT statements:

```sql
INSERT INTO users (id, email, first_name)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'user@example.com', 'User')
ON CONFLICT (id) DO NOTHING;
```

### Connection String Issues

**Error:** "failed to connect"

**Verify:**
1. PostgreSQL service is running
2. Connection string is correct
3. User has database permissions
4. Firewall allows connection

### Migration Already Applied

**Error:** "Script has already been run against this database"

**Solution:** Check `__dbup_journal` table:

```sql
SELECT * FROM __dbup_journal ORDER BY executed_on DESC;
```

If a migration failed partially, manually verify state and either:
1. Fix the migration and re-run
2. Record it as applied if changes are already in place

## Testing Migrations

### Unit Test Example

```csharp
using Xunit;
using DbUp;

namespace Infrastructure.Tests;

public class MigrationTests
{
    [Fact]
    public async Task Migrations_ShouldRun_Successfully()
    {
        // Arrange
        var connectionString = "Host=localhost;Database=ProjectDb_Test;Username=testuser;Password=testpass";
        var upgrader = DeployChanges.To
            .PostgresqlDatabase(connectionString)
            .WithScriptsEmbeddedInAssembly(typeof(DbMigrationRunner).Assembly)
            .Build();

        // Act
        var result = upgrader.PerformUpgrade();

        // Assert
        Assert.True(result.Successful);
        Assert.Empty(result.Error?.Message ?? "");
    }
}
```

## Resources

- [DbUp Documentation](https://dbup.readthedocs.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [DbUp GitHub Repository](https://github.com/DbUp/DbUp)

---

**Last Updated:** November 4, 2025
**Version:** 1.0

Follow this guide to maintain reliable, version-controlled database schemas!
