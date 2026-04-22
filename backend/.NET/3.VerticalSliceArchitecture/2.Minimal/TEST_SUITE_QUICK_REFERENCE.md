# ?? Test Suite Quick Reference

## Running Tests

```bash
# All tests
dotnet test Test/Test.csproj

# Specific class
dotnet test Test/Test.csproj --filter ClassName=PizzaTests

# Verbose output
dotnet test Test/Test.csproj --logger "console;verbosity=detailed"
```

## Test Classes

| Class | Tests | Location |
|-------|-------|----------|
| `PizzaTests` | 31 | `Test/Pizzas/V1/PizzaTests.cs` |
| `OrderTests` | 23 | `Test/Orders/V1/OrderTests.cs` |
| `PizzaImageServiceTests` | 8 | `Test/Services/PizzaImageServiceTests.cs` |
| `DataValidationTests` | 9 | `Test/Validation/DataValidationTests.cs` |

## Object Mothers (Test Data)

### Pizza Data
```csharp
using Test.Setup.ObjectMothers;

// Single
PizzaMother.Create()
PizzaMother.CreateActive()
PizzaMother.CreateDisabled()
PizzaMother.CreateWithName("Name")

// Multiple
PizzaMother.CreateMany(10)
PizzaMother.CreateActivePizzas(5)

// Models
PizzaModelMother.Create()
PizzaModelMother.CreateMany(10)
```

### Order Data
```csharp
using Test.Setup.ObjectMothers;

// Single
OrderMother.Create()
OrderMother.CreateWithStatus(OrderStatus.Confirmed)
OrderMother.CreateForPizza(pizzaId: 1)

// Multiple
OrderMother.CreateMany(10)
OrderMother.CreateConfirmedOrders(5)
OrderMother.CreateCompleteOrders(5)

// Models
OrderModelMother.Create()
OrderModelMother.CreateWithStatus(OrderStatus.Making)
```

## Test Statistics

```
? Total Tests: 69
? Passing: 69 (100%)
? Duration: ~1.5 seconds
```

## Key Files

| File | Purpose |
|------|---------|
| `Test/GlobalUsings.cs` | Global imports |
| `Test/Setup/ObjectMothers/DataMother.cs` | Test data factories |
| `Test/Setup/DatabaseContextFactory.cs` | Database setup |
| `Test/Setup/QueryTestBase.cs` | Base test class |

## Adding a Test

```csharp
[TestFixture]
public class MyTests : QueryTestBase
{
    [SetUp]
    public void Init()
    {
        // Setup
    }

    [Test]
    public void Should_DoSomething()
    {
        // Arrange
        var pizza = PizzaMother.Create();
        
        // Act & Assert
        Assert.That(pizza.Name, Is.Not.Empty);
    }
}
```

## Build & Test Commands

```bash
# Build only
dotnet build Test/Test.csproj

# Test only
dotnet test Test/Test.csproj --no-build

# Build + Test
dotnet test Test/Test.csproj

# Coverage report
dotnet test Test/Test.csproj --collect:"XPlat Code Coverage"
```

---

**Status:** ? All 69 tests passing
