# Angular Application Source Code

This folder contains the main Angular application source code with components, services, and modules organized by feature.

## 📂 Folder Structure

```
src/
├── app/                       # Main application code
│   ├── core/                 # Singleton services & infrastructure
│   ├── shared/               # Reusable components & utilities
│   ├── features/             # Feature-specific modules
│   ├── app-routing.module.ts
│   ├── app.component.*
│   └── app.module.ts
├── assets/                   # Static files
├── environments/             # Environment configurations
├── index.html                # Entry HTML file
├── main.ts                   # Application bootstrap
└── styles/                   # Global styles
```

## 🎯 Key Directories

### `/app/core`
**Purpose**: Singleton services, guards, and interceptors used throughout the app

- **Services**: Authentication, HTTP, User management
- **Guards**: Route protection
- **Interceptors**: HTTP request/response handling
- **Only imported in AppModule** - enforces singleton pattern

**When to add files here**:
- Creating services used by multiple features
- Building authentication/authorization guards
- Creating HTTP interceptors

### `/app/shared`
**Purpose**: Reusable components, pipes, and directives

- **Components**: Buttons, Headers, Modals, Cards
- **Pipes**: Custom data transformers
- **Directives**: Custom element behaviors
- **Models**: Shared interfaces and types

**When to add files here**:
- Creating UI components used in multiple features
- Building custom pipes or directives
- Defining shared data models

### `/app/features`
**Purpose**: Feature-specific modules with their own components and services

- Each feature in its own folder
- Include routing specific to feature
- Lazy loaded when possible

**When to add files here**:
- Creating new features or pages
- Building feature-specific services
- Adding routes for a feature

## 🚀 Getting Started

1. **Explore the structure**: Check out how existing components are organized
2. **Review ARCHITECTURE_OVERVIEW.md** in parent directory for system design
3. **Read CODING_STANDARDS.md** for code guidelines
4. **Check ONBOARDING.md** for developer setup

## 📁 Creating New Components

### Single Feature Component
```bash
# From project root
ng generate component src/app/features/user/components/user-card
```

Result:
```
src/app/features/user/components/user-card/
├── user-card.component.ts
├── user-card.component.html
├── user-card.component.scss
└── user-card.component.spec.ts
```

### Shared Component
```bash
ng generate component src/app/shared/components/button
```

### Feature Service
```bash
ng generate service src/app/features/user/services/user
```

## 🔍 Code Organization Principles

### Separation of Concerns
- **Components**: Handle UI and user interactions
- **Services**: Manage business logic and data
- **Guards**: Protect routes
- **Interceptors**: Handle cross-cutting HTTP concerns

### Module Imports
```
AppModule
├── Imports CoreModule (once)
├── Imports SharedModule
└── Lazy loads FeatureModules
```

### File Naming
- Components: `component-name.component.ts`
- Services: `service-name.service.ts`
- Guards: `guard-name.guard.ts`
- Pipes: `pipe-name.pipe.ts`
- Directives: `directive-name.directive.ts`

## 💡 Common Tasks

### Add a Route
Edit `app/app-routing.module.ts` or feature routing module:
```typescript
const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent }
];
```

### Create a Service
```bash
ng generate service services/user
```

### Add Dependency Injection
```typescript
export class MyComponent {
  constructor(private userService: UserService) { }
}
```

### Use RxJS Observables
```typescript
export class UserListComponent implements OnInit {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) { }
}
```

```html
<div *ngFor="let user of users$ | async">
  {{ user.name }}
</div>
```

## 🧪 Testing

Each component and service should have a `.spec.ts` file with unit tests.

```bash
# Run all tests
ng test

# Run specific test
ng test --watch=false --include='**/user.spec.ts'
```

## 🐛 Debugging

### View Component Structure
- Open DevTools (F12)
- Install Angular DevTools extension
- Inspect component properties and state

### Debug Specific Component
```typescript
// Add to component.ts
ngOnInit(): void {
  debugger; // Execution pauses here
  this.loadData();
}
```

## 📚 Related Documentation

- **Parent Directory**: `../README.md` - Angular project overview
- **Architecture**: `../ARCHITECTURE_OVERVIEW.md` - System design
- **Standards**: `../CODING_STANDARDS.md` - Code guidelines
- **Onboarding**: `../ONBOARDING.md` - Getting started guide
- **AI Guide**: `../AI_GUIDE.md` - Using AI for development

## ✅ Best Practices Checklist

When adding new code:
- [ ] Follow naming conventions (kebab-case for files/selectors)
- [ ] Add TypeScript types to all parameters
- [ ] Create interfaces for data models
- [ ] Use OnPush change detection where possible
- [ ] Clean up subscriptions in ngOnDestroy
- [ ] Add unit tests
- [ ] Document complex logic with comments
- [ ] Use reactive forms for complex forms
- [ ] Handle errors appropriately
- [ ] Use Angular DevTools to verify changes

## 🚀 Next Steps

1. Review existing component implementations
2. Understand the module structure
3. Create your first component using CLI
4. Add a service for business logic
5. Write unit tests
6. Get code reviewed

---

**Happy coding! 🎉**
