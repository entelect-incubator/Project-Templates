# Angular Learning Resources

Welcome to the Angular learning resources! This folder contains comprehensive guides for learning and developing Angular applications.

## 📚 Documentation Files

### Main Guides

- **[ONBOARDING.md](./ONBOARDING.md)** ⭐ **START HERE**
  - Quick start (5 minutes to first change)
  - Learning path by day
  - Essential tools setup
  - Create your first component
  - Angular CLI cheat sheet
  - FAQ section

- **[ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)**
  - Project structure explanation
  - Module organization
  - Service layer architecture
  - Data flow patterns
  - HTTP communication patterns
  - Best practices summary

- **[CODING_STANDARDS.md](./CODING_STANDARDS.md)**
  - Naming conventions (kebab-case)
  - Component decorators and structure
  - Lifecycle hooks patterns
  - Services and dependency injection
  - Things to avoid ❌
  - RxJS and Observables
  - Testing patterns

- **[AI_GUIDE.md](./AI_GUIDE.md)**
  - Using AI for code generation
  - Component generation prompts
  - Service creation patterns
  - Reactive Forms assistance
  - Testing with AI
  - Debugging tips

## 📂 Project Structure

```
Angular/
├── README.md (this file)
├── ONBOARDING.md (👈 start here!)
├── ARCHITECTURE_OVERVIEW.md
├── CODING_STANDARDS.md
├── AI_GUIDE.md
├── src/
│   ├── README.md (source code guide)
│   ├── app/
│   │   ├── core/           (singleton services)
│   │   ├── shared/         (reusable components)
│   │   ├── features/       (feature modules)
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   └── main.ts
├── pizza-ordering-app/
├── angular.json
└── package.json
```

## 🚀 Quick Start

1. **New to Angular?** → Read [ONBOARDING.md](./ONBOARDING.md)
2. **Need coding guidelines?** → Check [CODING_STANDARDS.md](./CODING_STANDARDS.md)
3. **Want to understand the system?** → See [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
4. **Learning with AI?** → Review [AI_GUIDE.md](./AI_GUIDE.md)
5. **Source code structure?** → Go to [src/README.md](./src/README.md)

## 📖 Learning Paths

### Beginner (Week 1-2)
1. Read [ONBOARDING.md](./ONBOARDING.md) - Quick start
2. Complete Day 1-4 checklist
3. Create components with CLI
4. Understand templates and binding
5. Learn dependency injection

### Intermediate (Week 3-4)
1. Study [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)
2. Build services and HTTP calls
3. Read [CODING_STANDARDS.md](./CODING_STANDARDS.md)
4. Create feature modules
5. Implement Reactive Forms

### Advanced (Week 5+)
1. Master RxJS operators
2. Implement change detection strategies
3. Build custom directives and pipes
4. Create HTTP interceptors
5. Lead architecture decisions

## 💡 Key Concepts

### Angular Fundamentals
- **Components**: Built with @Component decorator
- **Templates**: HTML with Angular directives
- **Services**: Business logic and data management
- **Dependency Injection**: Angular's built-in DI container
- **Modules**: Organize related components and services
- **Routing**: Navigate between components
- **RxJS**: Reactive programming with Observables

### Best Practices
- ✅ Use Angular CLI to generate code
- ✅ Organize by feature modules
- ✅ Separate smart/presentational components
- ✅ Use Reactive Forms
- ✅ Clean up subscriptions in ngOnDestroy
- ✅ Use OnPush change detection
- ✅ Write unit tests

### Things to Avoid ❌
- Don't use template forms
- Don't forget to unsubscribe from Observables
- Don't manipulate DOM directly
- Don't skip error handling
- Don't ignore memory leaks
- Don't create circular dependencies
- Don't abuse two-way binding

## 🛠️ Development Stack

### Core Technologies
- **Angular 20+** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Angular Material** - UI components (optional)
- **TailwindCSS** - Styling (project-dependent)

### Testing
- **Karma** - Test runner (pre-configured)
- **Jasmine** - Testing framework
- **TestBed** - Angular testing utilities

### Build & Deploy
- **Angular CLI** - Command-line tools
- **Webpack** - Module bundler
- **Cloudflare Pages** - Deployment (via wrangler)

### Development Tools
- **VS Code** - Code editor
- **Angular DevTools** - Browser extension
- **ESLint** - Code quality
- **Prettier** - Code formatter

## 🎯 Common Tasks

### Generate a Component
```bash
# Full path from project root
ng generate component src/app/features/user/user-list
# or short form
ng g c src/app/features/user/user-list
```

### Generate a Service
```bash
ng generate service src/app/features/user/services/user
```

### Create a Module
```bash
ng generate module src/app/features/user
```

### Generate Everything at Once
```bash
ng generate module src/app/features/user --routing
ng generate component src/app/features/user/components/user-list
ng generate service src/app/features/user/services/user
```

## 🧪 Testing

```bash
# Run all tests
ng test

# Run tests without watch mode
ng test --watch=false

# Run specific test file
ng test --include='**/user.spec.ts'
```

## 🐛 Debugging

1. **Angular DevTools** - Inspect component tree and state
2. **Browser DevTools** - Check console and network
3. **VS Code Debugger** - Step through code
4. **Router Debug** - Enable debug tracing
5. **Console logging** - Quick debugging

## 📞 Getting Help

1. Check relevant documentation file
2. Search for similar code in project
3. Review [CODING_STANDARDS.md](./CODING_STANDARDS.md)
4. Check [src/README.md](./src/README.md) for structure
5. Ask a team member
6. Check official [Angular Docs](https://angular.io/docs)

## 📚 External Resources

### Official
- [Angular Documentation](https://angular.io/docs)
- [Angular API Reference](https://angular.io/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev)

### Community
- [Angular Best Practices](https://angular.io/guide/styleguide)
- [RxJS Operators](https://rxjs.dev/api)
- [Angular Material](https://material.angular.io)

## ✅ Onboarding Checklist

Before your first task:
- [ ] Read ONBOARDING.md completely
- [ ] Set up development environment
- [ ] Generate your first component
- [ ] Read CODING_STANDARDS.md
- [ ] Understand folder structure
- [ ] Review [src/README.md](./src/README.md)
- [ ] Run tests successfully
- [ ] Use Angular DevTools
- [ ] Ask questions if unsure

## 🎓 Certification Criteria

You're ready for independent development when you can:
- [ ] Explain Angular component lifecycle
- [ ] Use @Input and @Output correctly
- [ ] Create and inject services
- [ ] Build Reactive Forms with validation
- [ ] Handle HTTP requests with error handling
- [ ] Write passing unit tests with TestBed
- [ ] Use TypeScript effectively
- [ ] Clean up subscriptions properly
- [ ] Debug using DevTools
- [ ] Follow code style guidelines

## 🚀 Next Steps

1. **Choose your learning path** - Beginner, Intermediate, or Advanced
2. **Read ONBOARDING.md** - Get up and running (5 min)
3. **Review [src/README.md](./src/README.md)** - Understand structure
4. **Create your first component** - Hands-on experience
5. **Take on small tasks** - Build confidence
6. **Get code reviewed** - Learn from feedback
7. **Teach others** - Solidify your knowledge

---

## File Structure Quick Reference

```
Angular/
├── ONBOARDING.md ⭐ START HERE
├── ARCHITECTURE_OVERVIEW.md
├── CODING_STANDARDS.md
├── AI_GUIDE.md
├── README.md (this file)
├── src/
│   ├── README.md (detailed source structure)
│   └── app/
└── [Build & config files]
```

## Key Commands

```bash
# Development server
ng serve
ng serve --open

# Generate code
ng generate component name
ng generate service name

# Build
ng build
ng build --configuration production

# Test
ng test
ng test --watch=false

# Lint
ng lint
```

---

**Welcome to Angular development! Happy learning! 🎉**

For questions or suggestions, please reach out to your team lead.
