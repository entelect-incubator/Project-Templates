# Quick Start: Aspire 13 with PostgreSQL

## ?? 5-Minute Setup

### Prerequisites
- .NET 9.0+ installed
- Docker Desktop running
- `dotnet workload install aspire` (if not already installed)

### Run with Aspire

```bash
# Install Aspire (one-time)
dotnet workload install aspire

# Navigate to AspireHost
cd AspireHost

# Start the application
dotnet run
```

**That's it!** The application will:
1. ? Start PostgreSQL in Docker
2. ? Create `pizzadb` database
3. ? Start the API with automatic PostgreSQL connection
4. ? Seed 8 sample pizzas
5. ? Open Aspire Dashboard at `http://localhost:15258`

### Access the API

- **API Docs**: `http://localhost:5000/scalar/v1`
- **Health Check**: `http://localhost:5000/hc`
- **Dashboard**: `http://localhost:15258`

### Try an Endpoint

```bash
# Get all pizzas
curl -X POST http://localhost:5000/v1/pizzassearch \
  -H "Content-Type: application/json" \
  -d '{}' | jq
```

---

## ?? Database Reset (Development)

When starting the app with existing data:

```
?? Database already contains pizza data.
? Would you like to reset the database and reseed it? (y/n)
```

Type `y` to reset and reseed with fresh sample data.

---

## ?? Without Aspire (Local PostgreSQL)

If you don't want to use Docker/Aspire:

```bash
cd Api
dotnet run
```

**Requirements:**
- PostgreSQL running on `localhost:5432`
- Database: `pizzadb`
- User: `postgres`, Password: `postgres`

---

## ?? Without PostgreSQL (In-Memory)

Perfect for quick testing without any database setup:

```bash
# Remove connection strings to use in-memory
cd Api
dotnet run
```

Data persists only while the app is running.

---

## ?? Sample Pizzas

Automatically seeded on first run:

1. Margherita [ACTIVE]
2. Pepperoni [ACTIVE]
3. Hawaiian [ACTIVE]
4. BBQ Chicken [ACTIVE]
5. Vegetarian [ACTIVE]
6. Four Cheese [ACTIVE]
7. Mushroom Truffle [ACTIVE]
8. Spicy Italian [DISABLED]

---

## ?? Troubleshooting

### Port Already in Use

If port 5000 is in use:

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### Docker Not Running

```bash
# Start Docker Desktop or
docker run hello-world  # Test connection
```

### PostgreSQL Connection Failed

Check Aspire Dashboard logs or restart:

```bash
# Ctrl+C to stop Aspire
dotnet run  # Start again
```

---

## ?? Next Steps

- Read full docs: `ASPIRE_13_UPGRADE.md`
- Explore API: `http://localhost:5000/scalar/v1`
- View dashboard: `http://localhost:15258`
- Check health: `curl http://localhost:5000/hc | jq`

---

**Happy coding! ??**
