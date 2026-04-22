# Pezza Pizza Ordering App

A modern Angular 21 pizza ordering application with .NET Aspire integration.

## 📚 Documentation

| Document                                                   | Description                                        |
| ---------------------------------------------------------- | -------------------------------------------------- |
| [Angular Style Guide](./docs/ANGULAR_STYLE_GUIDE.md)       | Coding standards, SOLID principles, best practices |
| [Architecture Overview](./docs/ARCHITECTURE_OVERVIEW.md)   | Application structure and design patterns          |
| [Aspire Setup](./docs/ASPIRE_SETUP.md)                     | .NET Aspire development environment                |
| [AI Guide](./docs/AI_GUIDE.md)                             | AI-assisted development guidelines                 |
| [Angular Implementation](./docs/ANGULAR_IMPLEMENTATION.md) | Feature implementation details                     |
| [Coding Standards](./CODING_STANDARDS.md)                  | General coding standards                           |

## 🚀 Quick Start

### Development Server

```bash
# Standard Angular development
ng serve

# With .NET Aspire (includes backend services)
npm run aspire
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/              # Singletons, guards, interceptors
│   ├── shared/            # Reusable components, services
│   │   ├── components/    # UI components (header, footer, hero, toast-banner)
│   │   └── services/      # Shared services (theme, toast)
│   ├── features/          # Feature modules
│   │   ├── pizza/         # Pizza listing and details
│   │   └── order/         # Cart and ordering
│   └── generated/         # Auto-generated API clients
├── assets/                # Static assets
└── styles.scss            # Global styles with Tailwind
```

## 🛠️ Tech Stack

- **Angular 21** - Standalone components, Signals, Control flow
- **Tailwind CSS v4** - Utility-first styling
- **.NET Aspire** - Cloud-native development
- **OpenAPI Generator** - Type-safe API clients

## 📝 Code Generation

```bash
# Generate API clients from OpenAPI spec
npm run generate:api
```

## 🧪 Testing

```bash
# Unit tests
ng test

# E2E tests
ng e2e
```

## 🔧 Building

```bash
# Production build
ng build

# Build artifacts → dist/
```

---

For detailed development guidelines, see the [Angular Style Guide](./docs/ANGULAR_STYLE_GUIDE.md).


```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
