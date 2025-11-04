# .NET Unit Testing Standards

This guide establishes comprehensive testing standards for .NET backend development. Follow these patterns to ensure reliable, maintainable, and well-tested code.

## Testing Framework and Tools

- **Test Framework:** NUnit 4.x
- **Mocking Library:** Moq 4.x
- **Assertions:** FluentAssertions 6.x
- **Coverage Analysis:** Coverlet
- **Integration Tests:** xUnit with TestContainers for databases

## Project Structure

Organize test projects alongside source code:

```
src/
├── Api/
│   └── Features/
│       └── Todos/
│           └── TodosEndpoint.cs
├── Application/
│   └── Features/
│       └── Todos/
│           └── GetTodosHandler.cs
└── Domain/
    └── Entities/
        └── Todo.cs

tests/
├── Unit/
│   ├── Application/
│   │   └── Features/
│   │       └── Todos/
│   │           └── GetTodosHandlerTests.cs
│   ├── Domain/
│   │   └── Entities/
│   │       └── TodoTests.cs
│   └── Infrastructure/
│       └── Persistence/
│           └── TodoRepositoryTests.cs
├── Integration/
│   └── Features/
│       └── Todos/
│           └── TodosEndpointTests.cs
└── Performance/
    └── k6/
        └── scripts/
```

## Test Naming Convention

Use descriptive test method names following the pattern:

```csharp
[MethodUnderTest]_[Condition]_[ExpectedResult]
```

Examples:
- `GetTodos_WithValidRequest_ReturnsAllTodos`
- `CreateTodo_WithEmptyTitle_ReturnsBadRequest`
- `CompleteTodo_WithNonExistentId_ReturnsNotFound`
- `UpdateTodo_WithValidData_UpdatesAndReturnsSuccess`

## AAA Pattern (Arrange-Act-Assert)

All tests follow the Arrange-Act-Assert pattern for clarity:

```csharp
[Test]
public async Task GetTodo_WithValidId_ReturnsTodoAsync()
{
    // Arrange: Set up test data and mocks
    var todoId = Guid.NewGuid();
    var expectedTodo = new Todo { Id = todoId, Title = "Test" };
    
    var mockRepository = new Mock<ITodoRepository>();
    mockRepository
        .Setup(r => r.GetByIdAsync(todoId))
        .ReturnsAsync(expectedTodo);
    
    var handler = new GetTodoHandler(mockRepository.Object);

    // Act: Execute the method under test
    var result = await handler.Handle(
        new GetTodoQuery { Id = todoId },
        CancellationToken.None);

    // Assert: Verify the outcome
    result.Should().NotBeNull();
    result.Id.Should().Be(todoId);
    result.Title.Should().Be("Test");
    
    mockRepository.Verify(
        r => r.GetByIdAsync(todoId),
        Times.Once);
}
```

## Unit Testing Examples

### Domain Entity Tests

**File: `tests/Unit/Domain/Entities/TodoTests.cs`**

```csharp
using FluentAssertions;
using NUnit.Framework;
using Domain.Entities;

namespace Unit.Domain.Entities;

[TestFixture]
public class TodoTests
{
    [Test]
    public void CreateTodo_WithValidData_SucceedsAsync()
    {
        // Arrange
        const string title = "Test Todo";
        const string description = "Test description";
        var userId = Guid.NewGuid();

        // Act
        var todo = new Todo { Title = title, Description = description, UserId = userId };

        // Assert
        todo.Title.Should().Be(title);
        todo.Description.Should().Be(description);
        todo.UserId.Should().Be(userId);
        todo.Completed.Should().BeFalse();
        todo.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Test]
    public void CompleteTodo_WithValidData_MarksAsCompleted()
    {
        // Arrange
        var todo = new Todo { Title = "Test", UserId = Guid.NewGuid() };

        // Act
        todo.Complete();

        // Assert
        todo.Completed.Should().BeTrue();
        todo.CompletedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Test]
    public void UpdateTodo_WithNewTitle_UpdatesTitle()
    {
        // Arrange
        var todo = new Todo { Title = "Old Title", UserId = Guid.NewGuid() };
        const string newTitle = "New Title";

        // Act
        todo.UpdateTitle(newTitle);

        // Assert
        todo.Title.Should().Be(newTitle);
        todo.UpdatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Test]
    public void UpdateTodo_WithEmptyTitle_ThrowsArgumentException()
    {
        // Arrange
        var todo = new Todo { Title = "Valid Title", UserId = Guid.NewGuid() };

        // Act & Assert
        var exception = Assert.Throws<ArgumentException>(() => todo.UpdateTitle(string.Empty));
        exception?.Message.Should().Contain("Title cannot be empty");
    }
}
```

### Application Handler Tests

**File: `tests/Unit/Application/Features/Todos/GetTodosHandlerTests.cs`**

```csharp
using FluentAssertions;
using Moq;
using NUnit.Framework;
using Application.Features.Todos.Queries;
using Application.Features.Todos.Handlers;
using Domain.Entities;
using Domain.Interfaces;

namespace Unit.Application.Features.Todos;

[TestFixture]
public class GetTodosHandlerTests
{
    private Mock<ITodoRepository> _mockRepository;
    private GetTodosHandler _handler;

    [SetUp]
    public void Setup()
    {
        _mockRepository = new Mock<ITodoRepository>();
        _handler = new GetTodosHandler(_mockRepository.Object);
    }

    [Test]
    public async Task Handle_WithValidQuery_ReturnsTodosAsync()
    {
        // Arrange
        var query = new GetTodosQuery { Page = 1, PageSize = 10 };
        var todos = new List<Todo>
        {
            new() { Id = Guid.NewGuid(), Title = "Todo 1", UserId = Guid.NewGuid() },
            new() { Id = Guid.NewGuid(), Title = "Todo 2", UserId = Guid.NewGuid() },
        };

        _mockRepository
            .Setup(r => r.GetAllAsync(query.Page, query.PageSize))
            .ReturnsAsync(todos);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().HaveCount(2);
        result.Should().AllSatisfy(t => t.Title.Should().NotBeNullOrEmpty());
        _mockRepository.Verify(r => r.GetAllAsync(1, 10), Times.Once);
    }

    [Test]
    public async Task Handle_WithEmptyRepository_ReturnsEmptyListAsync()
    {
        // Arrange
        var query = new GetTodosQuery { Page = 1, PageSize = 10 };
        _mockRepository
            .Setup(r => r.GetAllAsync(It.IsAny<int>(), It.IsAny<int>()))
            .ReturnsAsync(new List<Todo>());

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeEmpty();
    }

    [Test]
    [TestCase(0, 10)]  // Invalid page
    [TestCase(1, 0)]   // Invalid page size
    [TestCase(-1, 10)] // Negative page
    public async Task Handle_WithInvalidPagination_ThrowsArgumentExceptionAsync(int page, int pageSize)
    {
        // Arrange
        var query = new GetTodosQuery { Page = page, PageSize = pageSize };

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(
            async () => await _handler.Handle(query, CancellationToken.None));
    }
}
```

### Repository Tests with Mocks

**File: `tests/Unit/Infrastructure/Persistence/TodoRepositoryTests.cs`**

```csharp
using FluentAssertions;
using Moq;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Persistence;
using Infrastructure.Repositories;
using Domain.Entities;

namespace Unit.Infrastructure.Persistence;

[TestFixture]
public class TodoRepositoryTests
{
    private Mock<AppDbContext> _mockDbContext;
    private Mock<DbSet<Todo>> _mockDbSet;
    private TodoRepository _repository;

    [SetUp]
    public void Setup()
    {
        _mockDbContext = new Mock<AppDbContext>(new DbContextOptions<AppDbContext>());
        _mockDbSet = new Mock<DbSet<Todo>>();
        
        _mockDbContext.Setup(c => c.Todos).Returns(_mockDbSet.Object);
        _repository = new TodoRepository(_mockDbContext.Object);
    }

    [Test]
    public async Task AddAsync_WithValidTodo_AddsTodoAsync()
    {
        // Arrange
        var todo = new Todo { Id = Guid.NewGuid(), Title = "New Todo", UserId = Guid.NewGuid() };

        // Act
        await _repository.AddAsync(todo);

        // Assert
        _mockDbSet.Verify(d => d.AddAsync(todo, It.IsAny<CancellationToken>()), Times.Once);
        _mockDbContext.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Test]
    public async Task DeleteAsync_WithValidId_DeletesTodoAsync()
    {
        // Arrange
        var todoId = Guid.NewGuid();
        var todo = new Todo { Id = todoId, Title = "Todo to delete" };

        _mockDbSet
            .Setup(d => d.FindAsync(It.IsAny<object[]>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(todo);

        // Act
        await _repository.DeleteAsync(todoId);

        // Assert
        _mockDbSet.Verify(d => d.Remove(todo), Times.Once);
        _mockDbContext.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
```

## Advanced Patterns

### Parametrized Tests

Use parametrized tests to test multiple scenarios:

```csharp
[Test]
[TestCase("", "Title cannot be empty")]
[TestCase(" ", "Title cannot be whitespace only")]
[TestCase("a".PadRight(256, 'a'), "Title exceeds maximum length")]
public void ValidateTodo_WithInvalidTitle_ThrowsException(string title, string expectedMessage)
{
    // Arrange & Act
    var exception = Assert.Throws<ArgumentException>(() => new Todo { Title = title });

    // Assert
    exception?.Message.Should().Contain(expectedMessage);
}
```

### Test Fixtures and Factory Methods

```csharp
[TestFixture]
public class TodoHandlerTests
{
    private static Todo CreateValidTodo(string title = "Default Title")
    {
        return new Todo
        {
            Id = Guid.NewGuid(),
            Title = title,
            UserId = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow
        };
    }

    private static Mock<ITodoRepository> CreateMockRepository()
    {
        return new Mock<ITodoRepository>();
    }

    [Test]
    public async Task Handle_WithValidTodo_SucceedsAsync()
    {
        // Arrange
        var todo = CreateValidTodo("Important Task");
        var mockRepository = CreateMockRepository();

        // Act & Assert
        // ... test code
    }
}
```

### Testing Exception Handling

```csharp
[Test]
public async Task Handle_WithDatabaseException_ThrowsApplicationExceptionAsync()
{
    // Arrange
    var mockRepository = new Mock<ITodoRepository>();
    mockRepository
        .Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
        .ThrowsAsync(new InvalidOperationException("Database error"));

    var handler = new GetTodoHandler(mockRepository.Object);

    // Act & Assert
    await Assert.ThrowsAsync<InvalidOperationException>(
        async () => await handler.Handle(
            new GetTodoQuery { Id = Guid.NewGuid() },
            CancellationToken.None));
}
```

## Integration Testing

**File: `tests/Integration/Features/Todos/TodosEndpointTests.cs`**

```csharp
using FluentAssertions;
using NUnit.Framework;
using System.Net;
using System.Net.Http.Json;

namespace Integration.Features.Todos;

[TestFixture]
public class TodosEndpointTests
{
    private HttpClient _httpClient;
    private WebApplicationFactory<Program> _factory;

    [OneTimeSetUp]
    public void GlobalSetup()
    {
        _factory = new WebApplicationFactory<Program>();
        _httpClient = _factory.CreateClient();
    }

    [OneTimeTearDown]
    public void GlobalTeardown()
    {
        _httpClient?.Dispose();
        _factory?.Dispose();
    }

    [Test]
    public async Task CreateTodo_WithValidData_ReturnsCreatedAsync()
    {
        // Arrange
        var createTodoDto = new { title = "Integration Test Todo", description = "Testing" };

        // Act
        var response = await _httpClient.PostAsJsonAsync("/api/todos", createTodoDto);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        var result = await response.Content.ReadAsAsync<dynamic>();
        result.title.Should().Be("Integration Test Todo");
    }

    [Test]
    public async Task ListTodos_WithValidRequest_ReturnsOkAsync()
    {
        // Act
        var response = await _httpClient.GetAsync("/api/todos?page=1&pageSize=10");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var todos = await response.Content.ReadAsAsync<List<dynamic>>();
        todos.Should().NotBeNull();
    }
}
```

## Coverage Requirements

### Coverage Targets

- **Overall:** Minimum 80% code coverage
- **Business Logic:** 90%+ coverage
- **Public APIs:** 100% coverage
- **Utilities:** 85%+ coverage

Exclude from coverage:
- Auto-generated code
- Configuration classes
- Logging setup
- Database context OnModelCreating

### Running Coverage Analysis

```bash
# Install Coverlet
dotnet add package coverlet.collector

# Run tests with coverage
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

# Generate HTML report
dotnet add package ReportGenerator
reportgenerator -reports:coverage.opencover.xml -targetdir:coveragereport -reporttypes:Html
```

## Testing Anti-Patterns to Avoid

### ❌ Testing Implementation Details

```csharp
// BAD: Testing internal method behavior
[Test]
public void InternalHelper_WithData_ReturnsValue()
{
    var result = _class.PrivateMethod("data");
    Assert.AreEqual("expected", result);
}

// GOOD: Test public behavior
[Test]
public void PublicMethod_WithData_ProducesExpectedBehavior()
{
    var result = _class.PublicMethod("data");
    result.Should().Be("expected");
}
```

### ❌ Brittle Tests with Hard-coded Values

```csharp
// BAD: Hard-coded values make tests fragile
[Test]
public async Task GetUsers_Returns_ExactCount()
{
    var users = await _repository.GetAllAsync();
    Assert.AreEqual(42, users.Count());
}

// GOOD: Test behavior, not exact counts
[Test]
public async Task GetUsers_Returns_NonEmptyList()
{
    var users = await _repository.GetAllAsync();
    users.Should().NotBeEmpty();
    users.Should().AllSatisfy(u => u.Id.Should().NotBeEmpty());
}
```

### ❌ Test Interdependencies

```csharp
// BAD: Tests depend on execution order
[Test]
public void Test1_CreateUser() { /* ... */ }

[Test]
public void Test2_GetUser() { /* depends on Test1 */ }

// GOOD: Each test is independent
[Test]
public void CreateAndRetrieveUser_Succeeds()
{
    var user = CreateUser();
    var retrieved = GetUser(user.Id);
    retrieved.Should().Be(user);
}
```

## Best Practices

### Do's

✅ Write focused tests that test one thing
✅ Use descriptive test names
✅ Keep tests DRY with factory methods
✅ Test behavior, not implementation
✅ Use FluentAssertions for readable assertions
✅ Mock external dependencies
✅ Test edge cases and error scenarios
✅ Keep tests fast and deterministic
✅ Use TestFixture for setup/teardown
✅ Maintain consistent naming conventions

### Don'ts

❌ Don't test private methods directly
❌ Don't hard-code test data
❌ Don't create inter-test dependencies
❌ Don't ignore test failures
❌ Don't write overly complex tests
❌ Don't skip exception testing
❌ Don't leave commented-out tests
❌ Don't use sleep/delays in tests
❌ Don't test multiple concerns per test
❌ Don't mix unit and integration tests

## CI/CD Integration

### GitHub Actions Example

```yaml
name: .NET Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'

      - name: Restore dependencies
        run: dotnet restore

      - name: Build
        run: dotnet build --no-restore

      - name: Run tests
        run: dotnet test --no-build --verbosity normal

      - name: Generate coverage
        run: dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.opencover.xml
```

## Resources

- [NUnit Documentation](https://docs.nunit.org/)
- [Moq Documentation](https://github.com/moq/moq4/wiki/Quickstart)
- [FluentAssertions Documentation](https://fluentassertions.com/)
- [xUnit.net](https://xunit.net/)
- [Coverlet Documentation](https://coverlet.io/)

---

**Last Updated:** November 4, 2025
**Version:** 1.0

Follow these standards to write maintainable, reliable tests!
