# Angular Development Onboarding Guide

## 🚀 Quick Start (5 minutes)

### 1. Environment Setup
```bash
# Install Node.js (v18+) from nodejs.org
node --version

# Navigate to the Angular project
cd Angular

# Install dependencies
npm install

# Start development server
ng serve
```

### 2. Open in Browser
- Navigate to `http://localhost:4200`
- You should see the application running
- Open DevTools (F12) for debugging

### 3. First Change
1. Open `src/app/app.component.ts`
2. Change some text or add a button
3. Save file (Ctrl+S)
4. See live reload in browser

**Congratulations! 🎉 You've made your first change.**

## 📚 Learning Path

### Day 1: Basics
- [ ] Understand Angular components
- [ ] Learn component decorators
- [ ] Explore the folder structure
- [ ] Read `ARCHITECTURE_OVERVIEW.md`

### Day 2: Templates & Binding
- [ ] Learn property binding `[property]`
- [ ] Learn event binding `(event)`
- [ ] Study two-way binding `[(ngModel)]`
- [ ] Understand ngIf, ngFor directives

### Day 3: Services & Dependency Injection
- [ ] Understand services
- [ ] Learn dependency injection
- [ ] Create a simple service
- [ ] Subscribe to observables

### Day 4: Advanced Topics
- [ ] Read `CODING_STANDARDS.md`
- [ ] Learn Reactive Forms
- [ ] Understand change detection
- [ ] Study HTTP communication

### Day 5+: Deep Dive
- [ ] Implement new features
- [ ] Handle API calls
- [ ] Build forms
- [ ] Write unit tests

## 🔧 Essential Tools

### Editor Setup
1. **Install VS Code** if not already installed
2. **Install Extensions:**
   - Angular Language Service
   - TypeScript Vue Plugin (Volar)
   - Prettier - Code formatter
   - ESLint
   - Angular Files

### Debugging
- **Angular DevTools** (Chrome extension)
  - Inspect component tree
  - View component properties
  - Profile change detection
  - Debug template expressions

### Testing
- **Karma** - Test runner (configured)
- **Jasmine** - Testing framework (configured)

## 📁 Folder Structure Quick Reference

```
src/
├── app/
│   ├── core/          # Singleton services, guards, interceptors
│   ├── shared/        # Shared components, pipes, directives
│   ├── features/      # Feature modules
│   └── app.module.ts  # Main module
├── assets/            # Static files
├── environments/      # Environment configurations
└── styles/            # Global styles
```

## 💡 Your First Component

### Step 1: Generate Component
```bash
ng generate component features/welcome
# Creates welcome component in features folder
```

### Step 2: Component File (`welcome.component.ts`)
```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  title = 'Welcome to Angular';
  
  constructor() { }
  
  ngOnInit(): void {
    console.log('Component initialized');
  }
}
```

### Step 3: Template (`welcome.component.html`)
```html
<div class="welcome-container">
  <h1>{{ title }}</h1>
  <p>👋 Welcome, Developer!</p>
</div>
```

### Step 4: Styles (`welcome.component.scss`)
```scss
.welcome-container {
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
}
```

### Step 5: Use in App
```typescript
// In app.module.ts - already imported by default
import { WelcomeComponent } from './features/welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  ...
})
export class AppModule { }
```

```html
<!-- In app.component.html -->
<app-welcome></app-welcome>
```

## 🎯 Common Tasks

### Add a New Service
```bash
ng generate service services/user
```

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }
}
```

### Add a Route
```typescript
// In your routing module
const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent }
];
```

### Create a Form
```typescript
export class UserFormComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

### Fetch Data from API
```typescript
export class UserListComponent implements OnInit, OnDestroy {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    // Data is fetched and displayed with async pipe
  }
}
```

```html
<div *ngFor="let user of users$ | async">
  <p>{{ user.name }}</p>
</div>
```

## 🧪 Testing Your Code

### Run Tests
```bash
ng test
```

### Write a Simple Test
```typescript
describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display welcome message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome');
  });
});
```

## 🐛 Debugging Tips

### 1. Use Angular DevTools
- Go to Applications tab in DevTools
- Find your component in the tree
- Inspect properties and change detection

### 2. Use Router Debug
```typescript
// In app-routing.module.ts
RouterModule.forRoot(routes, { enableTracing: true })
```

### 3. Console Logging
```typescript
console.log('Debug info:', value);
console.error('Error:', error);
console.warn('Warning:', warning);
```

### 4. Use Debugger Statement
```typescript
ngOnInit(): void {
  debugger; // Code execution pauses here
  this.loadData();
}
```

### 5. Angular DevTools Console
```javascript
// In browser console
ng.getComponent($0) // Get component from DOM element
ng.probe($0)        // Inspect element properties
```

## ❓ Frequently Asked Questions

### Q: What's the difference between component and service?
A: Components handle UI/presentation. Services handle business logic and data management.

### Q: When should I use ngIf vs hidden?
A: Use ngIf to remove from DOM (better performance). Use [hidden] to hide but keep in DOM.

### Q: How do I pass data between components?
A: Use @Input for parent-to-child, @Output for child-to-parent. Use services for distant components.

### Q: What are Observables?
A: Observables are streams of data that can be subscribed to. They're the foundation of reactive programming in Angular.

### Q: How do I handle HTTP errors?
A: Use catchError operator in pipe: `.pipe(catchError(this.handleError))`

### Q: What's OnPush change detection?
A: A performance optimization that only checks component when inputs change.

## 📖 Additional Resources

### Official Documentation
- [Angular Docs](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Material](https://material.angular.io)

### Local Documentation
- `ARCHITECTURE_OVERVIEW.md` - System design
- `CODING_STANDARDS.md` - Code guidelines
- `AI_GUIDE.md` - AI assistance tips

## ✅ Your First Week Checklist

- [ ] Environment set up and running
- [ ] Understand component structure
- [ ] Read architecture overview
- [ ] Created first component with `ng generate`
- [ ] Added a service
- [ ] Set up routing
- [ ] Fetched data from API
- [ ] Created a form with validation
- [ ] Wrote a unit test
- [ ] Used Angular DevTools for debugging
- [ ] Reviewed `CODING_STANDARDS.md`
- [ ] Asked senior dev for code review

## 🆘 Need Help?

1. Check the relevant documentation
2. Search existing code for examples
3. Use Angular DevTools for debugging
4. Run tests to catch issues early
5. Ask a team member
6. Check official Angular documentation

## 🎓 Next Steps

Once you're comfortable with basics:
1. Read `CODING_STANDARDS.md` thoroughly
2. Review existing components in the project
3. Learn Reactive Forms in depth
4. Study RxJS operators
5. Work on state management
6. Take on small feature tasks
7. Lead a code review session

## 📊 Angular CLI Commands Cheat Sheet

```bash
# Generate components, services, modules
ng generate component component-name
ng generate service service-name
ng generate module module-name

# Build for production
ng build --configuration production

# Deploy (if configured)
ng deploy

# Format code
ng lint

# Run tests
ng test
ng test --watch=false

# Serve with live reload
ng serve
ng serve --open  # Opens browser automatically
```

---

**Welcome to Angular! Happy coding! 🚀**
