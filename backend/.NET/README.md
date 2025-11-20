# .NET Backend Templates

Production-ready backend templates for .NET applications following industry best practices and architectural patterns.

## Overview

This directory contains three distinct architectural patterns for building scalable, maintainable .NET backend applications. Each template represents a different approach to organizing code and managing dependencies, allowing you to choose the pattern that best fits your project's needs.

## 📁 Available Templates

### 1. Layered Architecture
**Directory:** `1.LayeredArchitecture/`

A pragmatic approach to organizing code into logical layers with clear separation of concerns.

**Best For:**
- Projects requiring quick startup
- Teams with varying experience levels
- When flexibility in technology choices per layer is important
- Well-defined project scope

**Architecture Layers:**
- **Presentation Layer** - API controllers and HTTP concerns
- **Application Layer** - Business logic and use cases
- **Domain Layer** - Core business rules and entities
- **Data Access Layer** - Database interactions (optional)
- **Infrastructure Layer** - External dependencies and cross-cutting concerns

**Advantages:**
- ✅ Simple to understand and implement
- ✅ Easy team onboarding
- ✅ Clear separation of concerns
- ✅ Flexible technology choices per layer
- ✅ Fast development iteration

**When Not to Use:**
- ❌ Projects with complex, long-term architectural requirements
- ❌ Need for strict dependency rules
- ❌ Multiple independent teams working on different areas

**Key Features:**
- Clean Template (DbContext as UnitOfWork) - ✨ Recommended
- Optional DataAccess Layer for additional abstraction
- Includes database migrations
- Example CRUD operations

---

### 2. Clean Architecture
**Directory:** `2.CleanArchitecture/`

Strict separation of concerns with well-defined dependency direction, pioneered by Robert C. Martin.

**Best For:**
- Large, complex applications
- Projects with evolving requirements
- Long-term maintenance is critical
- Multiple teams requiring clear boundaries

**Architecture Layers:**
- **Domain Layer** - Enterprise business logic and entities
- **Application Layer** - Use cases and business logic
- **Infrastructure Layer** - Technical implementations
- **Presentation Layer** - API controllers and web concerns

**Principles:**
- Independent of frameworks
- Testable independently
- Independent of UI
- Independent of database
- Independent of any external agency

**Advantages:**
- ✅ Strict architectural boundaries
- ✅ Framework-agnostic design
- ✅ Highly testable code
- ✅ Long-term maintainability
- ✅ Clear dependency direction (inward)
- ✅ Easy to replace components

**When Not to Use:**
- ❌ Small projects where overhead is excessive
- ❌ Teams that need quick development without structure
- ❌ Project scope requires frequent architectural changes

**Key Features:**
- Clear dependency direction (all arrows point inward)
- Repository pattern implementation
- CQRS pattern support with MediatR
- Comprehensive abstraction layers
- Advanced testing patterns

---

### 3. Vertical Slice Architecture
**Directory:** `3.VerticalSliceArchitecture/`

Organizes code by features rather than technical layers, enabling end-to-end feature delivery.

**Best For:**
- Agile and iterative development
- Rapid feature delivery needed
- Cross-functional teams
- Projects where features are relatively independent

**Organization:**
- Each feature is a complete vertical slice
- Slices contain all layers (UI, business logic, data access)
- Features can evolve independently
- Shared infrastructure for cross-cutting concerns

**Advantages:**
- ✅ Rapid feature delivery
- ✅ Holistic understanding of features
- ✅ Reduced integration challenges
- ✅ Cross-functional collaboration
- ✅ Independent feature development
- ✅ Flexibility in technology per feature
- ✅ Faster feedback loops

**When Not to Use:**
- ❌ Highly coupled business logic across features
- ❌ Need for strict architectural consistency
- ❌ Small team with limited experience

**Key Features:**
- Feature-based folder structure
- CQRS pattern with MediatR
- Independent feature handlers
- Shared infrastructure utilities
- Event-driven communication between features

---

## 🛠️ Technology Stack (All Templates)

### Core Framework
- **.NET 9** - Latest runtime with C# 13 features
- **ASP.NET Core** - Web framework

### Data Access
- **Entity Framework Core 9** - ORM
- **SQL Server / PostgreSQL / SQLite** - Databases supported

### Architecture & Patterns
- **MediatR** - CQRS and mediator pattern
- **AutoMapper** - Object-to-object mapping

### Validation & Business Rules
- **FluentValidation** - Declarative validation
- **Polly** - Resilience patterns (retry, circuit breaker, etc.)

### API & Documentation
- **NSwag** - OpenAPI/Swagger generation
- **Fluent API** - Configuration

### Feature Management
- **Microsoft.FeatureManagement** - Feature flags and toggles
- **Rate Limiting** - Built-in rate limiting

### Testing
- **NUnit** - Testing framework
- **FluentAssertions** - Fluent assertion library
- **Moq** - Mocking framework
- **AutoFixture** - Test data generation

---

## 🚀 Getting Started

### Prerequisites

1. **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
   - Check your version: `dotnet --version`

2. **Git** - For version control

3. **IDE** - Visual Studio, VS Code, or Rider

4. **SQL Server / PostgreSQL** (optional) - For database setup

### Step-by-Step Setup

#### 1. Choose Your Template

```bash
# Choose one of these directories based on your needs:
# - 1.LayeredArchitecture/      (Recommended for most projects)
# - 2.CleanArchitecture/        (For complex, long-term projects)
# - 3.VerticalSliceArchitecture/ (For agile, feature-driven projects)
```

#### 2. Copy the Template

```bash
# Option A: Copy the template to a new location
cp -r 1.LayeredArchitecture ../MyNewProject
cd ../MyNewProject

# Option B: Clone the repository and work with the template
git clone https://github.com/entelect-incubator/Project-Templates.git
cd Project-Templates/backend/.NET/1.LayeredArchitecture
```

#### 3. Install Dependencies

```bash
# Restore NuGet packages
dotnet restore
```

#### 4. Configure the Application

- Edit `appsettings.json` with your configuration
- Update connection strings for your database
- Configure any external services

#### 5. Database Setup (if using)

```bash
# Update connection string in appsettings.json
# Then run migrations (if applicable)
dotnet ef database update
```

#### 6. Run the Application

```bash
# Development
dotnet run

# With hot reload
dotnet watch run
```

The API will be available at `https://localhost:7000` by default.

#### 7. Explore the API

- Swagger UI: `https://localhost:7000/swagger/index.html`
- OpenAPI JSON: `https://localhost:7000/swagger/v1/swagger.json`

---

## 📚 Project Structure Example (Layered)

```
1.LayeredArchitecture/
├── src/
│   ├── MyApp.Api/                 # Presentation Layer
│   │   ├── Controllers/
│   │   ├── Filters/
│   │   ├── Middleware/
│   │   ├── appsettings.json
│   │   └── Program.cs
│   ├── MyApp.Application/         # Application Layer
│   │   ├── Features/
│   │   ├── Behaviors/
│   │   ├── Validators/
│   │   └── AutoMapper/
│   ├── MyApp.Domain/              # Domain Layer
│   │   ├── Entities/
│   │   ├── Interfaces/
│   │   └── Specifications/
│   ├── MyApp.Infrastructure/      # Infrastructure Layer
│   │   ├── Data/
│   │   ├── Migrations/
│   │   ├── Repositories/
│   │   └── Services/
│   └── MyApp.Shared/              # Cross-cutting Concerns
│       ├── Constants/
│       ├── Exceptions/
│       └── Extensions/
├── tests/
│   ├── MyApp.Application.Tests/
│   ├── MyApp.Domain.Tests/
│   └── MyApp.Integration.Tests/
├── MyApp.sln
└── README.md
```

---

## 🔄 Common Tasks

### Running Tests

```bash
# Run all tests
dotnet test

# Run tests with coverage
dotnet test /p:CollectCoverage=true

# Run specific test project
dotnet test tests/MyApp.Application.Tests
```

### Database Migrations (EF Core)

```bash
# Create a new migration
dotnet ef migrations add MigrationName

# Remove the last migration
dotnet ef migrations remove

# Update database to latest migration
dotnet ef database update

# Drop the database
dotnet ef database drop
```

### Code Formatting

```bash
# Format code
dotnet format

# Analyze code
dotnet analyzer
```

### Build & Publish

```bash
# Build the solution
dotnet build

# Publish for production
dotnet publish -c Release -o ./publish
```

---

## 📖 Architecture Decision Guide

### Choose Layered If...
- ✅ This is your first production .NET application
- ✅ Your team has mixed experience levels
- ✅ You need to move quickly
- ✅ Your project scope is clear and bounded

### Choose Clean If...
- ✅ Your business logic is complex
- ✅ Long-term maintenance is a priority
- ✅ Multiple teams will work on the project
- ✅ Technology flexibility within layers is important
- ✅ You want maximum testability

### Choose Vertical Slice If...
- ✅ You're using Agile/Scrum methodology
- ✅ Features are largely independent
- ✅ Rapid delivery and feedback is critical
- ✅ Your team is cross-functional
- ✅ Different features might need different tech stacks

---

## ⚡ Performance Optimizations

All templates include modern performance optimizations enabled by default:

### HTTP/3 Support (QUIC Protocol)
Enables the latest high-performance protocol with improved connection establishment and reduced latency.

```csharp
// Automatically configured in all templates
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000, listenOptions => 
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3);
});
```

**Benefits:**
- ⬆️ 20-30% faster connection establishment
- ⬇️ Reduced latency and improved throughput
- ✅ UDP-based, more resilient to packet loss
- ✅ Multiplexing support like HTTP/2

**Protocol Support:**
- ✅ HTTP/1.1 - Legacy browser compatibility
- ✅ HTTP/2 - Modern multiplexing
- ✅ HTTP/3 - Latest optimization (enabled by default)

### Response Compression

Both Brotli and Gzip compression are configured with `CompressionLevel.Fastest` for optimal throughput:

```csharp
// Brotli Compression
services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});

// Gzip Compression
services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = CompressionLevel.Fastest;
});
```

**Compression Ratio:**
- 📊 Brotli: 15-25% smaller payloads (better compression)
- 📊 Gzip: 10-15% smaller payloads (universal support)
- ⚡ Fastest Level: Optimized for throughput over ratio

### Performance Metrics

| Metric             | Impact                                 |
| ------------------ | -------------------------------------- |
| HTTP/3 Adoption    | ~20-30% faster connections             |
| Brotli Compression | ~20% average size reduction            |
| Gzip Compression   | ~15% average size reduction            |
| Combined Effect    | Significantly improved page load times |

### Verification

Test HTTP/3 support on your local machine:

```bash
# Using curl with HTTP/3 support (requires curl 7.75+)
curl --http3 https://localhost:5000/api/health
```

Monitor compression in browser DevTools:
- Open Network tab
- Look for `Content-Encoding` header (should show `br` or `gzip`)
- Compare sizes: Original vs. Transferred

---

## 🤝 Contributing

Found an issue or want to improve the templates? Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) at the root of the repository.

---

## 📚 Additional Resources

### Official Documentation
- [Microsoft .NET Documentation](https://docs.microsoft.com/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/)

### Architecture & Design
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
- [Domain-Driven Design](https://www.domainlanguage.com/ddd/)

### Patterns & Practices
- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)

### Community Resources
- [.NET Foundation](https://dotnetfoundation.org/)
- [NDepend Architecture Analyses](https://www.ndepend.com/)

---

## 📞 Support

- **Issues** - Report bugs or request features
- **Discussions** - Join conversations about patterns and best practices
- **Pull Requests** - Contribute improvements

---

**Happy Coding! 🚀**

*Built with ❤️ by the Entelect Incubator team*
