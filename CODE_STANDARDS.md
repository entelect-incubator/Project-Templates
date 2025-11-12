# Code Standards Guide

A comprehensive guide to maintaining consistent, clean, and professional code across all Project Templates stacks.

## Table of Contents

1. [Naming Conventions](#naming-conventions)
2. [File Layout & Organization](#file-layout--organization)
3. [Error Handling](#error-handling)
4. [Logging](#logging)
5. [Testing Standards](#testing-standards)
6. [SOLID Principles](#solid-principles)
7. [DRY - Don't Repeat Yourself](#dry---dont-repeat-yourself)
8. [YAGNI - You Aren't Gonna Need It](#yagni---you-arent-gonna-need-it)
9. [Code Review Checklist](#code-review-checklist)
10. [Language-Specific Standards](#language-specific-standards)

---

## Naming Conventions

### General Rules

**Be Descriptive and Clear**
- Names should reveal intent
- Avoid single letters except for loop counters
- Avoid misleading names
- Use pronounceable names

### .NET/C# Naming

```csharp
// ✅ GOOD
public class UserService { }
private readonly IUserRepository userRepository;
public string FirstName { get; set; }
private const int MaxRetryAttempts = 3;
private static readonly object _lockObject = new();

// ❌ BAD
public class USerService { }
private readonly IUserRepository userRepository;
public string fn { get; set; }
private const int max = 3;
```

**Classes & Interfaces**
- PascalCase for class names
- Interfaces start with `I` prefix (e.g., `IUserRepository`)
- Use nouns for classes
- Use adjectives or `I` prefix for interfaces

**Methods & Properties**
- PascalCase for public members
- camelCase for private/local variables
- Use verbs for methods (Get, Set, Create, Delete, etc.)

**Constants**
- PascalCase for constants
- Consider using `const` or `static readonly`

### TypeScript/JavaScript Naming

```typescript
// ✅ GOOD
class UserService {}
interface IUserRepository {}
const MAX_RETRY_ATTEMPTS = 3;
function getUserById(id: string): Promise<User> {}
const firstName: string = "John";

// ❌ BAD
class userService {}
interface userRepository {}
const max = 3;
function getUserbyID(id: string) {}
let fn = "John";
```

**Classes & Interfaces**
- PascalCase for class names
- PascalCase for interface names (optional `I` prefix)
- Use nouns for classes

**Functions & Methods**
- camelCase for function names
- Use verbs for functions (get, set, create, delete, etc.)
- Clearly indicate async operations

**Constants**
- UPPER_SNAKE_CASE for constants
- Use `const` for immutable values

**Variables**
- camelCase for variables
- Use descriptive names

---

## File Layout & Organization

### .NET Project Structure

```
src/
├── [ProjectName].Api/
│   ├── Controllers/
│   │   └── UsersController.cs
│   ├── Middleware/
│   │   └── ErrorHandlingMiddleware.cs
│   ├── Filters/
│   │   └── ValidationFilter.cs
│   ├── Program.cs
│   └── appsettings.json
│
├── [ProjectName].Application/
│   ├── Features/
│   │   ├── Users/
│   │   │   ├── Commands/
│   │   │   │   ├── CreateUserCommand.cs
│   │   │   │   └── CreateUserCommandHandler.cs
│   │   │   ├── Queries/
│   │   │   │   ├── GetUserByIdQuery.cs
│   │   │   │   └── GetUserByIdQueryHandler.cs
│   │   │   ├── Models/
│   │   │   │   └── CreateUserDto.cs
│   │   │   └── Validators/
│   │   │       └── CreateUserCommandValidator.cs
│   │   └── Products/
│   │       └── ...
│   ├── Behaviors/
│   │   └── ValidationBehavior.cs
│   └── AutoMapper/
│       └── MappingProfile.cs
│
├── [ProjectName].Domain/
│   ├── Entities/
│   │   └── User.cs
│   ├── Interfaces/
│   │   └── IUserRepository.cs
│   ├── Exceptions/
│   │   └── UserNotFoundException.cs
│   └── Specifications/
│       └── UserSpecification.cs
│
├── [ProjectName].Infrastructure/
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   └── Migrations/
│   │       └── [Migration files]
│   ├── Repositories/
│   │   └── UserRepository.cs
│   ├── Services/
│   │   └── EmailService.cs
│   └── Configuration/
│       └── DatabaseConfiguration.cs
│
└── [ProjectName].Shared/
    ├── Constants/
    │   └── ApplicationConstants.cs
    ├── Exceptions/
    │   └── ApplicationException.cs
    ├── Extensions/
    │   └── StringExtensions.cs
    └── Utilities/
        └── Logger.cs
```

**File Organization Principles**
1. Group related functionality together
2. One primary class per file
3. Keep files focused and single-responsibility
4. Maximum file size: 500 lines (aim for <300)
5. Use meaningful folder names

### React/TypeScript Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Button.test.tsx
│   ├── features/
│   │   ├── User/
│   │   │   ├── UserList.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── UserList.test.tsx
│   │   └── Product/
│   │       └── ...
│   └── layouts/
│       └── MainLayout.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── useAuth.test.ts
│
├── services/
│   ├── api/
│   │   ├── userApi.ts
│   │   └── productApi.ts
│   └── auth/
│       └── authService.ts
│
├── store/
│   ├── slices/
│   │   ├── userSlice.ts
│   │   └── productSlice.ts
│   └── index.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   ├── validators.ts
│   ├── formatters.ts
│   └── validators.test.ts
│
├── styles/
│   └── globals.css
│
└── App.tsx
```

---

## Error Handling

### .NET Error Handling

```csharp
// ✅ GOOD - Custom exceptions with context
public class UserNotFoundException : Exception
{
    public UserNotFoundException(string userId)
        : base($"User with ID '{userId}' not found.") { }
}

// ✅ GOOD - Try-catch with specific exceptions
try
{
    var user = await userRepository.GetUserByIdAsync(userId);
    if (user == null)
        throw new UserNotFoundException(userId);
    
    return user;
}
catch (UserNotFoundException ex)
{
    logger.LogWarning(ex, "User not found: {UserId}", userId);
    throw;
}
catch (OperationCanceledException ex)
{
    logger.LogWarning(ex, "Operation cancelled");
    throw;
}
catch (Exception ex)
{
    logger.LogError(ex, "Unexpected error occurred");
    throw new ApplicationException("An unexpected error occurred.", ex);
}

// ❌ BAD - Generic catch-all
try
{
    var user = await userRepository.GetUserByIdAsync(userId);
    return user;
}
catch { }

// ❌ BAD - Swallowing exceptions
catch (Exception ex)
{
    return null;
}
```

**Error Handling Best Practices**
1. Use specific exception types
2. Log exceptions with context
3. Use Try-Result pattern for recoverable errors
4. Don't catch Exception unless you handle it
5. Never silently fail

### TypeScript/React Error Handling

```typescript
// ✅ GOOD - Custom error class
class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: unknown
    ) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

// ✅ GOOD - Error boundary and handling
async function fetchUser(id: string): Promise<User> {
    try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
            throw new ApiError(
                response.status,
                `Failed to fetch user: ${response.statusText}`,
                await response.json()
            );
        }
        return response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            logger.warn(`API error: ${error.message}`, error.details);
            throw error;
        }
        logger.error("Unexpected error fetching user", error);
        throw new ApiError(500, "An unexpected error occurred", error);
    }
}

// ❌ BAD - Generic error handling
async function fetchUser(id: string) {
    try {
        return await fetch(`/api/users/${id}`).then(r => r.json());
    } catch (error) {
        console.log(error);
    }
}
```

---

## Logging

### Logging Levels

```
DEBUG   - Detailed diagnostic information
INFO    - General informational messages
WARNING - Warning messages for potentially harmful situations
ERROR   - Error messages for error events
FATAL   - Fatal error messages for very severe errors
```

### .NET Logging Example

```csharp
// ✅ GOOD - Structured logging
logger.LogInformation("User created: {UserId} by {RequesterId}",
    newUser.Id, currentUserId);

logger.LogWarning("Retry attempt {Attempt} for operation {OperationId}",
    attempt, operationId);

logger.LogError(exception, "Failed to process payment for order {OrderId}",
    orderId);

// ❌ BAD - String concatenation
logger.LogInformation("User created: " + newUser.Id);
logger.LogError("Error: " + exception.Message);
```

### TypeScript/React Logging Example

```typescript
// ✅ GOOD - Structured logging
logger.info("User created", {
    userId: newUser.id,
    requesterId: currentUserId,
    timestamp: new Date().toISOString()
});

logger.warn("Retry attempt", {
    attempt,
    operationId,
    nextRetryIn: "5s"
});

logger.error("Failed to process payment", {
    orderId,
    error: error.message,
    stack: error.stack
});

// ❌ BAD - Unstructured logging
logger.info("User created: " + newUser.id);
console.log("Error:", error);
```

**Logging Best Practices**
1. Use appropriate log levels
2. Include relevant context
3. Avoid logging sensitive data
4. Use structured logging
5. Don't log inside loops
6. Include correlation IDs for request tracing

---

## Testing Standards

### .NET Unit Testing

```csharp
// ✅ GOOD - Clear test structure with AAA pattern
[TestFixture]
public class UserServiceTests
{
    private UserService _sut; // System Under Test
    private Mock<IUserRepository> _mockUserRepository;

    [SetUp]
    public void Setup()
    {
        _mockUserRepository = new Mock<IUserRepository>();
        _sut = new UserService(_mockUserRepository.Object);
    }

    [Test]
    public async Task GetUserById_WithValidId_ReturnsUser()
    {
        // Arrange
        var userId = "user-123";
        var expectedUser = new User { Id = userId, Name = "John Doe" };
        _mockUserRepository
            .Setup(r => r.GetUserByIdAsync(userId))
            .ReturnsAsync(expectedUser);

        // Act
        var result = await _sut.GetUserById(userId);

        // Assert
        Assert.That(result, Is.EqualTo(expectedUser));
        _mockUserRepository.Verify(r => r.GetUserByIdAsync(userId), Times.Once);
    }

    [Test]
    public async Task GetUserById_WithInvalidId_ThrowsException()
    {
        // Arrange
        var userId = "invalid-id";
        _mockUserRepository
            .Setup(r => r.GetUserByIdAsync(userId))
            .ReturnsAsync((User)null);

        // Act & Assert
        Assert.ThrowsAsync<UserNotFoundException>(
            () => _sut.GetUserById(userId)
        );
    }
}
```

**Test Naming Convention:** `[MethodName]_[Condition]_[ExpectedResult]`

### React Testing with Vitest

```typescript
// ✅ GOOD - Component test with Vitest
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard Component', () => {
    let mockUser: User;

    beforeEach(() => {
        mockUser = {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com'
        };
    });

    it('should render user information correctly', () => {
        // Arrange
        render(<UserCard user={mockUser} />);

        // Act & Assert
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('should call onEdit when edit button is clicked', async () => {
        // Arrange
        const mockOnEdit = vi.fn();
        const { getByRole } = render(
            <UserCard user={mockUser} onEdit={mockOnEdit} />
        );

        // Act
        const editButton = getByRole('button', { name: /edit/i });
        await userEvent.click(editButton);

        // Assert
        expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
    });
});
```

### API Testing with .http Files

```http
### Get User by ID
GET https://localhost:7001/api/users/user-123
Content-Type: application/json
Authorization: Bearer {{token}}

### Create User
POST https://localhost:7001/api/users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}

### Update User
PUT https://localhost:7001/api/users/user-123
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe"
}

### Delete User
DELETE https://localhost:7001/api/users/user-123
```

### Playwright E2E Testing

```typescript
// ✅ GOOD - E2E test with Playwright
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://localhost:3000');
        await page.fill('[data-testid="email"]', 'user@example.com');
        await page.fill('[data-testid="password"]', 'password123');
        await page.click('button:has-text("Login")');
    });

    test('should display user list', async ({ page }) => {
        // Arrange & Act
        await page.goto('https://localhost:3000/users');

        // Assert
        expect(page.url()).toContain('/users');
        const userCards = await page.locator('[data-testid="user-card"]').count();
        expect(userCards).toBeGreaterThan(0);
    });

    test('should create new user', async ({ page }) => {
        // Act
        await page.click('button:has-text("New User")');
        await page.fill('[data-testid="first-name"]', 'John');
        await page.fill('[data-testid="last-name"]', 'Doe');
        await page.fill('[data-testid="email"]', 'john@example.com');
        await page.click('button:has-text("Create")');

        // Assert
        await expect(page.locator('text=User created successfully')).toBeVisible();
    });
});
```

---

## SOLID Principles

### Single Responsibility Principle (SRP)

```csharp
// ❌ BAD - Multiple responsibilities
public class UserManager
{
    public void CreateUser(User user) { }
    public void SendWelcomeEmail(User user) { }
    public void LogUserCreation(User user) { }
    public void UpdateUserCache(User user) { }
}

// ✅ GOOD - Single responsibility
public class UserService
{
    public void CreateUser(User user) { }
}

public class EmailService
{
    public void SendWelcomeEmail(User user) { }
}

public class LoggingService
{
    public void LogUserCreation(User user) { }
}

public class CacheService
{
    public void UpdateUserCache(User user) { }
}
```

### Open/Closed Principle (OCP)

```csharp
// ❌ BAD - Closed for extension
public class NotificationService
{
    public void Send(string type, string message)
    {
        if (type == "email")
            SendEmail(message);
        else if (type == "sms")
            SendSms(message);
        else if (type == "push")
            SendPush(message);
    }
}

// ✅ GOOD - Open for extension
public interface INotificationChannel
{
    Task SendAsync(string message);
}

public class EmailNotificationChannel : INotificationChannel
{
    public async Task SendAsync(string message) { }
}

public class NotificationService
{
    private readonly INotificationChannel _channel;

    public NotificationService(INotificationChannel channel)
    {
        _channel = channel;
    }

    public async Task SendAsync(string message)
    {
        await _channel.SendAsync(message);
    }
}
```

### Liskov Substitution Principle (LSP)

```csharp
// ❌ BAD - Violates LSP
public abstract class Bird
{
    public abstract void Fly();
}

public class Penguin : Bird
{
    public override void Fly()
    {
        throw new NotImplementedException("Penguins cannot fly");
    }
}

// ✅ GOOD - Respects LSP
public abstract class Bird { }

public interface IFlying
{
    void Fly();
}

public class Sparrow : Bird, IFlying
{
    public void Fly() { }
}

public class Penguin : Bird { }
```

### Interface Segregation Principle (ISP)

```csharp
// ❌ BAD - Fat interface
public interface IUserService
{
    User GetUser(int id);
    void UpdateUser(User user);
    void DeleteUser(int id);
    void SendEmail(User user);
    void GenerateReport(User user);
}

// ✅ GOOD - Segregated interfaces
public interface IUserRepository
{
    User GetUser(int id);
    void UpdateUser(User user);
    void DeleteUser(int id);
}

public interface IEmailService
{
    void SendEmail(User user);
}

public interface IReportService
{
    void GenerateReport(User user);
}
```

### Dependency Inversion Principle (DIP)

```csharp
// ❌ BAD - Depends on concrete classes
public class UserService
{
    private SqlUserRepository _repository = new();

    public User GetUser(int id) => _repository.GetUser(id);
}

// ✅ GOOD - Depends on abstractions
public class UserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public User GetUser(int id) => _repository.GetUser(id);
}
```

---

## DRY - Don't Repeat Yourself

### Code Duplication Problems

```csharp
// ❌ BAD - Repeated validation logic
public async Task<User> CreateUser(CreateUserRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Email))
        throw new ValidationException("Email is required");
    if (request.Email.Length > 255)
        throw new ValidationException("Email must be less than 255 characters");
    if (!IsValidEmail(request.Email))
        throw new ValidationException("Email format is invalid");

    // Create user...
}

public async Task<User> UpdateUser(UpdateUserRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Email))
        throw new ValidationException("Email is required");
    if (request.Email.Length > 255)
        throw new ValidationException("Email must be less than 255 characters");
    if (!IsValidEmail(request.Email))
        throw new ValidationException("Email format is invalid");

    // Update user...
}

// ✅ GOOD - Extracted validation
public class EmailValidator : AbstractValidator<EmailRequest>
{
    public EmailValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .MaximumLength(255).WithMessage("Email must be less than 255 characters")
            .EmailAddress().WithMessage("Email format is invalid");
    }
}

public async Task<User> CreateUser(CreateUserRequest request)
{
    await _validator.ValidateAndThrowAsync(request);
    // Create user...
}

public async Task<User> UpdateUser(UpdateUserRequest request)
{
    await _validator.ValidateAndThrowAsync(request);
    // Update user...
}
```

### Extract Common Patterns

```typescript
// ❌ BAD - Repeated API calls
function fetchUsers() {
    return fetch('/api/users')
        .then(r => {
            if (!r.ok) throw new Error('Failed to fetch');
            return r.json();
        })
        .catch(e => {
            logger.error('Users fetch failed', e);
            throw e;
        });
}

function fetchProducts() {
    return fetch('/api/products')
        .then(r => {
            if (!r.ok) throw new Error('Failed to fetch');
            return r.json();
        })
        .catch(e => {
            logger.error('Products fetch failed', e);
            throw e;
        });
}

// ✅ GOOD - Generic fetch utility
async function fetchApi<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new ApiError(response.status, `Failed to fetch ${endpoint}`);
    }
    return response.json() as Promise<T>;
}

const fetchUsers = () => fetchApi<User[]>('/api/users');
const fetchProducts = () => fetchApi<Product[]>('/api/products');
```

---

## YAGNI - You Aren't Gonna Need It

### Avoid Premature Generalization

```csharp
// ❌ BAD - Over-engineered for future needs
public class UserService
{
    // Why this parameter? No current need
    public User GetUser(int id, UserFilterOptions options = null)
    {
        // Filtering logic that's never used
        if (options?.ExcludeDeleted ?? true)
            // ...
        if (options?.OnlyActive ?? true)
            // ...
    }
}

// ✅ GOOD - Simple and focused
public class UserService
{
    public User GetUser(int id)
    {
        // Simple implementation
    }

    // Add complexity only when needed
    public User[] GetActiveUsers()
    {
        // Specific implementation for active users
    }
}
```

### Keep It Simple

```typescript
// ❌ BAD - Complex base class hierarchy
abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    auditLog: AuditEntry[];
    metadata: Map<string, unknown>;
}

class User extends BaseEntity {
    // User specific properties
}

// ✅ GOOD - Simple structure
interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
```

---

## Code Review Checklist

### Before Submitting a PR

- [ ] Code follows naming conventions for the language
- [ ] No duplicate code (DRY principle)
- [ ] No unnecessary complexity (YAGNI principle)
- [ ] Error handling is appropriate and logged
- [ ] Tests are included and meaningful
- [ ] Documentation is updated if needed
- [ ] No hardcoded values (use constants/config)
- [ ] Performance impact considered
- [ ] Security implications reviewed
- [ ] SOLID principles followed

### During Code Review

- [ ] Does the code solve the stated problem?
- [ ] Is the approach sensible?
- [ ] Could this be implemented more simply?
- [ ] Are there edge cases not handled?
- [ ] Could this break existing functionality?
- [ ] Is the code testable?
- [ ] Are there any obvious bugs?
- [ ] Is the code maintainable?

---

## Language-Specific Standards

### .NET Backend Standards

**File Naming**
- Classes: `PascalCase.cs`
- Interfaces: `IPascalCase.cs`
- Exceptions: `SpecificException.cs`

**Access Modifiers**
- Use explicit access modifiers (never implicit `internal`)
- Private fields with underscore prefix: `_fieldName`

**Async/Await**
```csharp
// ✅ GOOD
public async Task<User> GetUserAsync(int id)
{
    return await _repository.GetUserByIdAsync(id);
}

// ❌ BAD
public Task<User> GetUser(int id)
{
    return _repository.GetUserById(id);
}
```

**Null Safety**
```csharp
// ✅ GOOD - Use null-coalescing and null-conditional operators
var name = user?.Name ?? "Unknown";

// ✅ GOOD - Explicit null check
if (user != null)
{
    // ...
}
```

### React/TypeScript Frontend Standards

**File Naming**
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Hooks: `useHookName.ts`
- Tests: `filename.test.ts`

**Type Safety**
```typescript
// ✅ GOOD - Explicit types
interface User {
    id: string;
    name: string;
    email: string;
}

const user: User = { /* ... */ };

// ❌ BAD - Implicit any
const user = { /* ... */ };
```

**Component Structure**
```typescript
// ✅ GOOD
export interface UserCardProps {
    user: User;
    onEdit?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
    return (
        <div>
            {/* Component JSX */}
        </div>
    );
};

export default UserCard;
```

---

## Enforcement & Tooling

### .NET

- **Code Analysis**: Enable all default analyzers
- **Formatting**: Use `dotnet format` (included in templates)
- **Testing**: NUnit with >80% coverage for business logic
- **Linting**: Use EditorConfig and .NET Analyzers

### React/TypeScript

- **Linting**: ESLint with strict configuration
- **Formatting**: Prettier (auto-format on save)
- **Type Checking**: TypeScript strict mode enabled
- **Testing**: Vitest for unit tests, Playwright for E2E

### Database

- **Migrations**: DbUp for .NET (version control all changes)
- **Naming**: snake_case for all database identifiers
- **Documentation**: Comment complex migrations

---

## Conclusion

These standards ensure:
- **Consistency** across the codebase
- **Maintainability** for long-term projects
- **Readability** for all team members
- **Quality** through best practices
- **Scalability** as the project grows

Follow these guidelines and encourage team members to do the same. Code review is key to maintaining standards.

---

**Questions or suggestions? Open a discussion or PR!**

*Built with ❤️ for professional development*
