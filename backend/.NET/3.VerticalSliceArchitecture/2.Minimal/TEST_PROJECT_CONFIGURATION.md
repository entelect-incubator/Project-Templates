# Test Project - Configuration & Setup

## Changes Applied ?

### 1. Test.csproj - Disabled Custom Build Steps

Removed the `RunCustomBuildSteps` target that was executing tests during build.

**Why:** Tests should run separately via `dotnet test`, not during build phase.

### 2. UpdatePizzaCommand.cs - Simplified Query

Replaced `EF.CompileAsyncQuery` with `FirstOrDefaultAsync` for test compatibility.

### 3. DatabaseContextFactory.cs - Minimal Setup

Simplified to use unique InMemory databases per test without complex service configuration.

---

## How to Run Tests

```bash
# Build only
dotnet build Test/Test.csproj

# Run tests
dotnet test Test/Test.csproj

# Run with logging
dotnet test Test/Test.csproj --logger "console;verbosity=detailed"
```

---

**Status:** ? Build successful, tests ready for execution