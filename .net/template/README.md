# .NET Minimal API Template - Vertical Slice Architecture

This template provides a production-ready minimal API implementation using Vertical Slice Architecture with OpenAPI/Swagger integration for seamless TypeScript client generation.

## 🏗️ Architecture Principles

### Vertical Slice Architecture
Instead of organizing by technical layers (Controllers, Services, Models), we organize by feature/slice:

```
Features/
├── Todos/
│   ├── GetTodos/
│   │   ├── GetTodosHandler.cs
│   │   ├── GetTodosRequest.cs
│   │   └── GetTodosResponse.cs
│   ├── CreateTodo/
│   │   ├── CreateTodoHandler.cs
│   │   ├── CreateTodoRequest.cs
│   │   └── CreateTodoResponse.cs
│   ├── TodosEndpoints.cs (Registers all endpoints)
│   └── TodosService.cs (Feature-specific service)
```

### Benefits
- ✅ Self-contained features
- ✅ Easy to delete entire features
- ✅ Reduced merge conflicts
- ✅ Scalable to large teams
- ✅ Clear feature boundaries
- ✅ OpenAPI auto-documentation

## 📡 OpenAPI/Swagger Integration

All endpoints are automatically documented with OpenAPI 3.0 specifications.

### Exposing OpenAPI Spec

The API automatically exposes OpenAPI spec at:
- **JSON**: `GET /openapi/v1.json`
- **UI**: `GET /swagger/ui` (Scalar UI)

### Generating TypeScript Client

Run from `frontend/React/template/`:

```bash
npm run generate:client
```

This downloads the OpenAPI spec and generates:
- `src/api/generated/client.ts` - Full typed client
- `src/api/generated/types.ts` - All DTOs and interfaces

## 🚀 Getting Started

1. **Review Structure**: Examine `Features/Todos` as example
2. **Add Feature**: Create new folder under `Features/`
3. **Implement Handlers**: One handler per operation
4. **Register Endpoints**: Add to feature endpoints file
5. **Generate Client**: Run `npm run generate:client` from React template

## 📦 Dependencies

- **Minimal API** - .NET 7+
- **OpenAPI** - Scalar.AspNetCore
- **Validation** - FluentValidation
- **Mapping** - AutoMapper
- **Logging** - Serilog
- **Error Handling** - Custom middleware

## 🔍 OpenAPI Annotations

Add XML comments for full OpenAPI documentation:

```csharp
/// <summary>
/// Get all todos with pagination
/// </summary>
/// <param name="page">Page number (default: 1)</param>
/// <param name="pageSize">Items per page (default: 10)</param>
/// <returns>Paginated list of todos</returns>
app.MapGet("/api/todos", GetTodos)
    .WithName("GetTodos")
    .WithOpenApi();
```

## 🔐 CORS and Security

Configure CORS for React development server:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("react-dev", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

app.UseCors("react-dev");
```

## 🧪 Testing

Each vertical slice includes integration tests that validate:
- Handler logic
- Request validation
- Error responses
- OpenAPI documentation

Run tests:
```bash
dotnet test
```

## 📚 Additional Resources

- [Vertical Slice Architecture](https://jimmybogard.com/vertical-slice-architecture/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
