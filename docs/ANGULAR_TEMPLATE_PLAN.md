# Angular 19+ Template - Implementation Plan

## Overview

Build a modern Angular template with:
- **Angular 19+** with standalone components (latest best practice)
- **Zoneless Change Detection** for performance
- **Tailwind CSS + SCSS** for flexible styling
- **Same Atomic Design System** as React template
- **OpenAPI Client Generation** for type-safe API calls
- **Shared Types** with React template

## Architecture Overview

```
Angular App Structure:
├── Standalone Components (no NgModule)
├── Zoneless Change Detection
├── Signals API for state management
├── RxJS Observables for async operations
├── Tailwind CSS + SCSS styling
├── OpenAPI Generated Client
└── Same Atomic Design System as React
```

## Phase 1: Setup & Configuration

### 1.1 Create Angular Project
```bash
ng new angular-template \
  --standalone \
  --routing \
  --skip-git \
  --package-manager=npm \
  --typescript \
  --style=scss
```

### 1.2 Configure Zoneless Change Detection
**In `main.ts`:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';

const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // ... other providers
  ],
};

bootstrapApplication(AppComponent, appConfig);
```

### 1.3 Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure `tailwind.config.js`:**
```javascript
export default {
  content: [
    "./src/**/*.{html,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 1.4 TypeScript Configuration
**Update `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2024",
    "useDefineForClassFields": false,
    "experimentalDecorators": true,
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/app/components/*"],
      "@services/*": ["src/app/services/*"],
      "@types/*": ["src/app/types/*"],
      "@utils/*": ["src/app/utils/*"]
    }
  }
}
```

## Phase 2: Shared Type System

### 2.1 Create Shared Types (Mirror React)
**`src/app/types/index.ts`:**
```typescript
export interface TodoDto {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date | null;
}

export interface CreateTodoCommand {
  title: string;
  description?: string | null;
}

export interface UpdateTodoCommand {
  id: string;
  title?: string | null;
  description?: string | null;
  completed?: boolean;
}

export interface PaginatedTodosDto {
  items: TodoDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TodosFilterOptions {
  page?: number;
  pageSize?: number;
  completed?: boolean;
  searchText?: string;
}
```

## Phase 3: Atomic Component Library

### 3.1 Create Base Directory Structure
```
src/app/components/
├── atoms/
│   ├── button/
│   │   ├── button.component.ts
│   │   └── button.component.scss
│   ├── input/
│   ├── checkbox/
│   ├── badge/
│   ├── card/
│   ├── alert/
│   ├── spinner/
│   └── index.ts
├── molecules/
│   ├── form-field/
│   ├── form/
│   ├── pagination/
│   ├── search-form/
│   ├── modal/
│   └── index.ts
├── organisms/
│   ├── todo-header/
│   ├── todo-item-actions/
│   ├── todo-delete-dialog/
│   └── index.ts
└── pages/
    └── todo-page/
```

### 3.2 Example: Button Component (Standalone)
**`src/app/components/atoms/button/button.component.ts`:**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClass"
      [disabled]="disabled || isLoading"
      (click)="handleClick()"
    >
      <span *ngIf="isLoading" class="spinner-small mr-2">⏳</span>
      {{ label }}
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() isLoading = false;
  @Output() clicked = new EventEmitter<void>();

  get buttonClass(): string {
    return `btn btn--${this.variant} btn--${this.size}`;
  }

  handleClick(): void {
    this.clicked.emit();
  }
}
```

**`src/app/components/atoms/button/button.component.scss`:**
```scss
.btn {
  @apply px-4 py-2 rounded-md font-medium transition-all;
  
  &--primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  &--secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
  
  &--danger {
    @apply bg-red-600 text-white hover:bg-red-700;
  }
  
  &--success {
    @apply bg-green-600 text-white hover:bg-green-700;
  }
  
  &--sm {
    @apply text-sm px-2 py-1;
  }
  
  &--md {
    @apply text-base px-4 py-2;
  }
  
  &--lg {
    @apply text-lg px-6 py-3;
  }
  
  &:disabled {
    @apply opacity-50 cursor-not-allowed;
  }
}
```

### 3.3 Export Barrel
**`src/app/components/atoms/index.ts`:**
```typescript
export * from './button/button.component';
export * from './input/input.component';
export * from './checkbox/checkbox.component';
export * from './badge/badge.component';
export * from './card/card.component';
export * from './alert/alert.component';
export * from './spinner/spinner.component';
```

## Phase 4: API Service Layer

### 4.1 Create API Client Service
**`src/app/services/api.service.ts`:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import type { 
  TodoDto, 
  PaginatedTodosDto, 
  CreateTodoCommand, 
  UpdateTodoCommand 
} from '@types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = 'http://localhost:5000/api';
  private readonly maxRetries = 3;

  constructor(private http: HttpClient) {}

  getTodos(page: number = 1, pageSize: number = 10): Observable<PaginatedTodosDto> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<PaginatedTodosDto>(`${this.apiUrl}/todos`, { params })
      .pipe(
        retry(this.maxRetries),
        catchError(this.handleError)
      );
  }

  getTodoById(id: string): Observable<TodoDto> {
    return this.http
      .get<TodoDto>(`${this.apiUrl}/todos/${id}`)
      .pipe(catchError(this.handleError));
  }

  createTodo(command: CreateTodoCommand): Observable<TodoDto> {
    return this.http
      .post<TodoDto>(`${this.apiUrl}/todos`, command)
      .pipe(catchError(this.handleError));
  }

  updateTodo(id: string, command: UpdateTodoCommand): Observable<TodoDto> {
    return this.http
      .put<TodoDto>(`${this.apiUrl}/todos/${id}`, command)
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/todos/${id}`)
      .pipe(catchError(this.handleError));
  }

  searchTodos(
    query: string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<PaginatedTodosDto> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http
      .get<PaginatedTodosDto>(`${this.apiUrl}/todos/search`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error(error?.error?.message || 'API Error'));
  }
}
```

## Phase 5: State Management with Signals

### 5.1 Create Todo Store with Signals
**`src/app/services/todo.store.ts`:**
```typescript
import { Injectable, computed, signal } from '@angular/core';
import { ApiService } from './api.service';
import type { TodoDto, PaginatedTodosDto } from '@types';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  // Signals
  private readonly todos = signal<TodoDto[]>([]);
  private readonly loading = signal(false);
  private readonly error = signal<string | null>(null);
  private readonly currentPage = signal(1);
  private readonly pageSize = signal(10);
  private readonly total = signal(0);

  // Computed
  readonly todoList = computed(() => this.todos());
  readonly isLoading = computed(() => this.loading());
  readonly errorMessage = computed(() => this.error());
  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));

  constructor(private api: ApiService) {}

  loadTodos(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.getTodos(this.currentPage(), this.pageSize()).subscribe({
      next: (result: PaginatedTodosDto) => {
        this.todos.set(result.items);
        this.total.set(result.total);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  addTodo(title: string, description?: string): void {
    this.api.createTodo({ title, description: description || null }).subscribe({
      next: (todo: TodoDto) => {
        this.todos.update((todos) => [todo, ...todos]);
      },
      error: (err) => this.error.set(err.message),
    });
  }

  updateTodo(id: string, completed: boolean): void {
    this.api.updateTodo(id, { completed }).subscribe({
      next: (updated: TodoDto) => {
        this.todos.update((todos) =>
          todos.map((t) => (t.id === id ? updated : t))
        );
      },
      error: (err) => this.error.set(err.message),
    });
  }

  deleteTodo(id: string): void {
    this.api.deleteTodo(id).subscribe({
      next: () => {
        this.todos.update((todos) => todos.filter((t) => t.id !== id));
      },
      error: (err) => this.error.set(err.message),
    });
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    this.loadTodos();
  }
}
```

## Phase 6: Todo Page Implementation

### 6.1 Todo Page Component
**`src/app/components/pages/todo-page/todo-page.component.ts`:**
```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoStore } from '@services/todo.store';
import { 
  ButtonComponent, 
  InputComponent, 
  CardComponent, 
  CheckboxComponent,
  SpinnerComponent,
  BadgeComponent 
} from '@components/atoms';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    CheckboxComponent,
    SpinnerComponent,
    BadgeComponent,
  ],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  protected readonly store = inject(TodoStore);
  protected readonly todos = this.store.todoList;
  protected readonly loading = this.store.isLoading;
  protected readonly error = this.store.errorMessage;
  protected readonly totalPages = this.store.totalPages;

  protected newTitle = signal('');
  protected newDescription = signal('');

  constructor(private store: TodoStore) {}

  ngOnInit(): void {
    this.store.loadTodos();
  }

  addTodo(): void {
    if (this.newTitle().trim()) {
      this.store.addTodo(this.newTitle(), this.newDescription());
      this.newTitle.set('');
      this.newDescription.set('');
    }
  }

  toggleTodo(id: string, completed: boolean): void {
    this.store.updateTodo(id, !completed);
  }

  deleteTodo(id: string): void {
    this.store.deleteTodo(id);
  }

  goToPage(page: number): void {
    this.store.setPage(page);
  }
}
```

## Phase 7: Styling with Tailwind + SCSS

### 7.1 Global Styles
**`src/styles/globals.scss`:**
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;

// Custom component classes
@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-all;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}

// Global variables
$primary: #3b82f6;
$success: #10b981;
$danger: #ef4444;
$warning: #f59e0b;

* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #111827;
  background-color: #f9fafb;
}
```

## Phase 8: OpenAPI Client Generation

### 8.1 Add Generation Script for Angular
**`clients/generation/generate-angular-client.bat`:**
Similar to React but with output to Angular project

**`clients/generation/generate-angular-client.sh`:**
Similar to React but with output to Angular project

### 8.2 Update NSwag Config
**`clients/generation/openapi-generator-angular.json`:**
```json
{
  "codeGenerators": {
    "openApiToTypeScriptClient": {
      "className": "TodoApiClient",
      "template": "Angular",
      "typeScriptVersion": 5.0,
      "output": "../generated/angular/src/api/generated.ts"
    }
  }
}
```

## Phase 9: Documentation

Create the following documentation files:

1. **`frontend/Angular/template/README.md`**
   - Setup instructions
   - Available scripts
   - Project structure
   - Component library guide

2. **`frontend/Angular/ANGULAR_SETUP_GUIDE.md`**
   - Zoneless change detection explanation
   - Signals API patterns
   - Component development guide
   - State management patterns

3. **`frontend/Angular/COMPONENT_LIBRARY.md`**
   - Atomic design system
   - Component APIs
   - Usage examples
   - Styling guidelines

4. **`frontend/Angular/OPENAPI_INTEGRATION.md`**
   - Client generation for Angular
   - Service integration
   - Type safety patterns

## Implementation Checklist

- [ ] Phase 1: Setup & Configuration
- [ ] Phase 2: Shared Type System
- [ ] Phase 3: Atomic Component Library
- [ ] Phase 4: API Service Layer
- [ ] Phase 5: State Management
- [ ] Phase 6: Todo Page Implementation
- [ ] Phase 7: Styling
- [ ] Phase 8: OpenAPI Generation
- [ ] Phase 9: Documentation

## Key Differences from React Template

| Aspect | React | Angular |
|--------|-------|---------|
| Change Detection | React-based | Zoneless (Angular 19+) |
| State Management | React Query | Signals API |
| Async Handling | Promises | RxJS Observables |
| Component Model | Hooks | Standalone Components |
| Styling | Tailwind + CSS Modules | Tailwind + SCSS |
| Type Safety | TypeScript | TypeScript |

## Estimated Timeline

- Phase 1-2: 1 hour
- Phase 3: 3-4 hours
- Phase 4-5: 2-3 hours
- Phase 6: 2-3 hours
- Phase 7: 1-2 hours
- Phase 8: 1 hour
- Phase 9: 2 hours
**Total: 12-17 hours**

---

**Status:** Ready for Implementation  
**Prerequisites:** Angular CLI 19+, Node.js 18+, npm
