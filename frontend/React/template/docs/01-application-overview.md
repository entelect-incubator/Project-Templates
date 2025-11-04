# 💻 Application Overview

## What is This Project?

A production-ready React 19.2 template that follows the ** React** principles and patterns. It's designed to help teams build secure, performant, and maintainable applications with sensible defaults and best practices built-in.

## Core Principles

### ✅ Easy to Get Started
- One-command setup
- Example components included
- Clear documentation
- Well-structured folders

### ✅ Simple to Understand
- Consistent patterns
- Self-documenting code  
- Clear naming conventions
- TypeScript throughout

### ✅ Right Tools for the Job
- **React 19.2** - Latest React with optimizations
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **SCSS** - Scoped component styles
- **OpenAPI** - Type-safe API clients
- **Vitest** - Lightning-fast unit tests
- **Playwright** - E2E testing

### ✅ Clean Boundaries
- **Feature-based organization** - Features in their own folders
- **Atomic components** - Atoms, molecules, organisms
- **API layer abstraction** - Loose coupling to backend
- **Clear responsibilities** - Each file has one job

### ✅ Team Alignment
- Documented standards
- Code examples
- Linting rules (ESLint)
- Pre-commit hooks

### ✅ Secure by Default
- XSS prevention
- CSRF protection  
- Input validation
- Secret management

### ✅ Performant
- Code splitting
- React Compiler optimization
- Lazy loading
- Efficient caching

### ✅ Scalable
- Works for small teams and large enterprises
- Modular architecture
- Easy to add features
- Supports multiple developers

### ✅ Issues Detected Early
- TypeScript strict mode
- ESLint rules
- Pre-commit checks
- CI/CD validation

## Architecture Overview

### Frontend (React)

```
src/
├── components/          # Reusable components (atomic design)
│   ├── atoms/          # Base components (Button, Input)
│   ├── molecules/      # Composed atoms (Form, Card)
│   └── organisms/      # Page-level (Header, Footer)
├── features/           # Feature-based code (Todos, Users)
├── api/                # API client & hooks (generated or manual)
├── hooks/              # Custom hooks (useAsync, useDebouncedSearch)
├── lib/                # Utilities (cache, telemetry, helpers)
├── config/             # Configuration (settings, constants)
├── styles/             # Global SCSS (variables, mixins)
└── types/              # Shared TypeScript types
```

### Backend (.NET)

```
.net/template/
├── Features/           # Vertical slices (Todos, Users)
│   ├── Todos/
│   │   ├── GetTodos/
│   │   ├── CreateTodo/
│   │   └── TodosEndpoints.cs
│   └── Users/
├── appsettings.json    # Configuration
└── Program.cs          # Startup
```

## Key Workflows

### 1. Create a New Feature

```
1. Create folder: src/features/TodoFeature/
2. Create folder: src/features/TodoFeature/hooks/
3. Create custom hook: useTodoData.ts
4. Create component: TodoPage.tsx
5. Create styles: TodoPage.scss
```

### 2. Add an API Endpoint

**Backend (.NET)**:
1. Create folder: `Features/TodoFeature/CreateTodo/`
2. Create handler: `CreateTodoHandler.cs`
3. Register endpoint in: `TodosEndpoints.cs`
4. Add XML comments for OpenAPI docs

**Frontend (React)**:
1. Run: `npm run generate:client`
2. New types auto-generated
3. Create hook: `useCreateTodo.ts`
4. Use in component

### 3. Build a Component

```tsx
// 1. Start with atoms
<Button variant="primary">Submit</Button>
<Input label="Title" />

// 2. Combine into molecules
<Form>
  <Input label="Title" />
  <Button>Submit</Button>
</Form>

// 3. Build organisms
<TodoForm onSubmit={handleSubmit} />
```

## Development Workflow

```bash
# Start development
npm run dev

# Run tests
npm run test

# Generate API client (when backend changes)
npm run generate:client

# Build for production
npm run build

# Deploy
npm run deploy
```

## Technology Stack

| Layer     | Technology          | Version | Purpose                    |
| --------- | ------------------- | ------- | -------------------------- |
| Runtime   | Node.js             | 20.x    | JavaScript runtime         |
| Framework | React               | 19.2    | UI library                 |
| Language  | TypeScript          | 5.3     | Type safety                |
| Build     | Vite                | 5.1     | Lightning-fast build tool  |
| Styling   | Tailwind + SCSS     | 3.4     | Utility & component styles |
| State     | React Query         | 5.29    | Server state               |
| API       | OpenAPI             | 3.0     | Type-safe clients          |
| Testing   | Vitest + Playwright | Latest  | Unit & E2E                 |
| Backend   | .NET                | 7+      | API server                 |

## Next Steps

1. **Read** [Project Standards](./02-project-standards.md) - Learn the rules
2. **Understand** [Project Structure](./03-project-structure.md) - Know where things go
3. **Learn** [Components](./04-components-and-styling.md) - Build UI
4. **Integrate** [API Layer](./05-api-layer.md) - Connect backend
5. **Secure** Review [Security](./09-security.md) checklist
6. **Optimize** Review [Performance](./10-performance.md) checklist

---

**Questions?** Check the relevant guide or open an issue on GitHub.
