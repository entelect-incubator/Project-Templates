# Angular Coding Standards

## Component Structure

### File Organization
```
components/
  user-card/
    user-card.component.ts        # Component logic
    user-card.component.html      # Template
    user-card.component.scss      # Styles
    user-card.component.spec.ts   # Unit tests
```

### Naming Conventions
- **Components**: kebab-case (e.g., `user-card`, `login-form`)
- **Component Class**: PascalCase (e.g., `UserCardComponent`)
- **Files**: kebab-case matching component (e.g., `user-card.component.ts`)
- **Selectors**: kebab-case (e.g., `app-user-card`)
- **Services**: camelCase with Service suffix (e.g., `userService`, `authService`)
- **Directives**: camelCase (e.g., `appHighlight`, `appDebounce`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_TIMEOUT`, `MAX_RETRIES`)

## Angular Best Practices

### Component Decorators
Always use:
- `@Component` with selector, template/templateUrl, and styles/styleUrls
- `@Input()` for parent-to-child communication
- `@Output()` for child-to-parent communication
- `@ViewChild()` for template reference access
- `@ContentChild()` for projected content

```typescript
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() userSelected = new EventEmitter<User>();
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.loadUserData();
  }
}
```

### Lifecycle Hooks
- Use OnInit to initialize data
- Use OnDestroy to clean up subscriptions
- Avoid logic in constructor
- Implement only needed hooks

```typescript
export class MyComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  
  ngOnInit(): void {
    this.subscription = this.data$.subscribe(...);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

### Services and Dependency Injection
- Create services for business logic and API calls
- Use providedIn: 'root' for singleton services
- Inject dependencies via constructor
- Keep components presentational

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

## Things to Avoid

### ❌ Don't Do This

1. **Logic in Templates**
   ```html
   <!-- Bad -->
   <div>{{ user.firstName.toUpperCase() + ' ' + user.lastName.toUpperCase() }}</div>
   
   <!-- Good -->
   <div>{{ fullName }}</div>
   ```

2. **Unsubscribe Issues**
   ```typescript
   // Bad
   ngOnInit() {
     this.data$.subscribe(...); // Memory leak!
   }
   
   // Good
   ngOnDestroy() {
     this.subscription.unsubscribe();
   }
   ```

3. **Direct DOM Manipulation**
   ```typescript
   // Bad
   document.getElementById('myDiv').innerHTML = value;
   
   // Good
   this.myValue = value; // Let Angular handle DOM
   ```

4. **Circular Dependencies**
   ```typescript
   // Bad - ServiceA imports ServiceB, ServiceB imports ServiceA
   
   // Good - Use shared service or refactor
   ```

5. **Two-Way Binding Abuse**
   ```html
   <!-- Bad - for arrays/complex objects -->
   <input [(ngModel)]="user.addresses[0].street" />
   
   <!-- Good - use (change) or formControl -->
   <input (change)="updateStreet($event.target.value)" />
   ```

6. **Forgetting Async Pipe**
   ```html
   <!-- Bad - manual subscription in component -->
   <div>{{ userData }}</div>
   
   <!-- Good - let Angular handle subscription -->
   <div>{{ userData$ | async }}</div>
   ```

7. **Heavy Computation in getters**
   ```typescript
   // Bad
   get fullName(): string {
     return (this.firstName + this.lastName).toUpperCase(); // Called on every change detection
   }
   
   // Good
   fullName$ = combineLatest([this.firstName$, this.lastName$]).pipe(
     map(([first, last]) => (first + last).toUpperCase())
   );
   ```

## Reactive Forms Best Practices

Always use Reactive Forms for complex forms:

```typescript
export class UserFormComponent implements OnInit {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      this.userService.saveUser(this.form.value).subscribe(...);
    }
  }
}
```

## Module Organization

```
app/
├── core/              # Singleton services, guards, interceptors
├── shared/            # Shared components, pipes, directives
├── features/          # Feature modules
│   ├── user/
│   ├── admin/
│   └── settings/
└── app.module.ts
```

## Testing

- Write unit tests for all components and services
- Use TestBed for component testing
- Mock services and API calls
- Test user interactions, not implementation

```typescript
describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent],
      providers: [{ provide: UserService, useValue: mockUserService }]
    }).compileComponents();
  });
  
  it('should display user name', () => {
    component.user = { id: 1, firstName: 'John', lastName: 'Doe' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('John');
  });
});
```

## RxJS and Observables

- Use Observables for async operations
- Prefer higher-order operators (switchMap, mergeMap)
- Unsubscribe or use async pipe
- Handle errors with catchError

```typescript
this.data$ = this.route.params.pipe(
  switchMap(params => this.userService.getUser(params.id)),
  catchError(error => {
    console.error('Error:', error);
    return of(null);
  })
);
```

## Type Safety

- Always define interfaces/types
- Avoid `any` type
- Use strict mode in tsconfig.json
- Type API responses

```typescript
interface User {
  id: number;
  firstName: string;
  email: string;
}

export class UserService {
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```

## Code Comments

- Document complex logic
- Explain why, not what
- Use JSDoc for public methods
- Keep comments updated

```typescript
/**
 * Fetches user by ID from the API
 * @param id - User ID to fetch
 * @returns Observable of User object
 * @throws HttpErrorResponse if user not found
 */
getUser(id: number): Observable<User> {
  // Retry up to 3 times on failure
  return this.http.get<User>(`/api/users/${id}`).pipe(
    retry(3),
    catchError(this.handleError)
  );
}
```
