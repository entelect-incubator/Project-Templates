# Backend Engineering Standards

This folder contains backend templates for .NET, Java, Node, and Python. These templates are intended to set the default engineering bar for new services.

## Goals

- Buildable by default
- Testable by design
- Secure by default
- Clear separation of concerns
- Consistent architectural boundaries
- Small, understandable feature slices

## Core Design Rules

### SOLID

- Single Responsibility Principle: each class, handler, controller, route, or module should have one reason to change.
- Open/Closed Principle: extend behavior through composition, strategies, decorators, policies, or handlers instead of editing unrelated code.
- Liskov Substitution Principle: abstractions must be replaceable by implementations without hidden behavior changes.
- Interface Segregation Principle: keep contracts narrow and task-focused.
- Dependency Inversion Principle: business logic depends on abstractions, not frameworks, databases, or HTTP concerns.

### Separation Of Concerns

- HTTP transport code must stay in controllers, endpoints, routes, or routers.
- Application logic belongs in handlers, services, or use-case classes.
- Domain logic belongs in domain entities, value objects, and policies.
- Persistence belongs behind repositories or data-access interfaces.
- Cross-cutting concerns such as logging, telemetry, validation, resilience, and security belong in shared infrastructure.

### Clean Architecture And Feature Slices

- Organize by feature first when possible.
- Keep dependency flow inward toward the domain or application core.
- Do not let transport or persistence types leak into domain logic.
- Prefer explicit command and query models.
- Expected business failures should return typed results instead of relying on exceptions for control flow.

## Best Coding Practices

- Keep public APIs small and explicit.
- Prefer constructor injection or equivalent DI over service location.
- Validate input at the boundary.
- Make nullability and failure modes explicit.
- Avoid static state for business workflows.
- Keep configuration externalized and environment-based.
- Use structured logging and correlation or trace IDs.
- Add comments only where intent is not obvious from the code.
- Favor boring, readable code over clever abstractions.

## Testing By Design

- Every feature should support unit tests without booting the whole app.
- Handlers should depend on interfaces so repositories, clocks, message buses, and external clients can be mocked or faked.
- Unit tests should cover success paths, validation failures, not found scenarios, authorization failures, and infrastructure failure mapping.
- Integration tests should verify the HTTP contract and persistence wiring.
- Performance smoke or load tests should live separately from unit and integration tests.

### Mocking And Test Data

- .NET: prefer Moq or NSubstitute with Bogus for realistic data generation.
- Java: prefer Mockito with builder or fixture factories.
- Node: prefer Vitest mocks with deterministic factories or faker.
- Python: prefer unittest.mock or pytest fixtures with factory helpers.
- Fake data should be realistic but deterministic where assertions depend on values.
- Shared test data helpers should only be reused when they do not leak architecture-specific types into other templates.

## Secure By Default Requirements

- Enforce authentication and authorization for protected endpoints.
- Validate all input and return safe error responses.
- Do not expose stack traces, secrets, or connection strings in responses or logs.
- Enable structured audit-friendly logging.
- Apply secure headers where the framework supports them.
- Use HTTPS and HSTS outside local development.
- Apply CORS intentionally, never with unrestricted production defaults.
- Apply rate limiting for public APIs.
- Pin dependencies carefully and review vulnerability warnings.
- Keep secrets in environment variables or secure secret stores.
- Use least-privilege database and service credentials.

## Validation Checklist For New Or Updated Projects

- Project builds from a clean checkout.
- Test suite runs locally and in CI.
- Handlers and services depend on abstractions.
- Repositories or data-access concerns are not embedded in routes or controllers.
- Validation exists at the boundary.
- Problem details or equivalent consistent error contracts are used.
- Authentication and authorization are implemented where needed.
- Rate limiting, logging, telemetry, and safe configuration are present.
- No critical dependency vulnerabilities remain unresolved.

## Current Validation Status

Validation was run on April 21, 2026 against the current workspace and local toolchain.

| Project                                                | Build/Test Status  | Adherence Summary                                                                                      | Key Gaps                                                                                              |
| ------------------------------------------------------ | ------------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `.NET/1.LayeredArchitecture/1. CleanTemplate`          | Passes             | Layering, benchmark project decoupling, build, and tests validated                                     | Nullable warning cleanup in `Api/Services/PizzaImageService.cs`                                       |
| `.NET/1.LayeredArchitecture/2. TemplateWithDataAccess` | Passes             | Layering, data access split, build, and tests validated                                                | Nullable warning cleanup in `Api/Services/PizzaImageService.cs`                                       |
| `.NET/2.CleanArchitecture`                             | Blocked/partial    | Strongest architecture and security baseline                                                           | API build hit a local file-lock on `Api.dll`; auth is not fully implemented by default                |
| `.NET/3.VerticalSliceArchitecture/1.Traditional`       | Blocked/partial    | Good feature slicing and tests                                                                         | API build hit a local file-lock on `Api.dll`; auth is not fully implemented by default                |
| `.NET/3.VerticalSliceArchitecture/2.Minimal`           | Passes             | Best verified state in this run                                                                        | Package version mismatch warnings and a high severity vulnerability warning in benchmark dependencies |
| `Java`                                                 | Passes after patch | Wrapper-enabled build, repository abstraction, and secure defaults are in place                        | Replace optional API-key auth with full JWT or OAuth2 and expand test coverage                        |
| `Node`                                                 | Passes after patch | Repository abstraction, secure headers, rate limiting, and optional API key middleware are implemented | Replace optional API-key auth with full JWT or OAuth2 and extend security tests                       |
| `Python`                                               | Passes after patch | Repository abstraction, secure headers, rate limiting, and optional API key middleware are implemented | Replace optional API-key auth with full JWT or OAuth2 and add broader integration scenarios           |

## Priority Fixes

1. Resolve intermittent `.NET` API assembly file-locks observed in CleanArchitecture and VerticalSlice Traditional solution runs.
2. Upgrade Java, Node, and Python templates from optional API-key security to full token-based authentication and authorization.
3. Add dedicated security and authorization tests across Java, Node, and Python.
4. Resolve .NET package mismatch and vulnerability warnings in benchmark or data-access dependencies.

## Expected Build Commands

- `.NET`: `dotnet build` and `dotnet test`
- `Java`: `./mvnw test` or `mvn test`
- `Node`: `npm install`, `npm run build`, `npm test`
- `Python`: `python -m pip install -r requirements.txt`, `python -m pytest`

Projects should not be considered template-ready until those commands succeed from a clean environment.
