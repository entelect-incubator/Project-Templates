# Angular Architecture Overview

## Project Structure

```mermaid
graph TB
    subgraph "Angular Application Architecture"
        A["src/"] --> B["app/"]
        A --> C["assets/"]
        A --> D["environments/"]
        A --> E["styles/"]
        
        B --> B1["core/"]
        B --> B2["shared/"]
        B --> B3["features/"]
        B --> B4["app.module.ts"]
        
        B1 --> B1a["services/"]
        B1 --> B1b["guards/"]
        B1 --> B1c["interceptors/"]
        
        B2 --> B2a["components/"]
        B2 --> B2b["pipes/"]
        B2 --> B2c["directives/"]
        
        B3 --> B3a["user/"]
        B3 --> B3b["admin/"]
        B3 --> B3c["dashboard/"]
    end
```

## Folder Structure Explanation

### `/src/app/core`
Singleton services and infrastructure

- **Services**: Authentication, HTTP, User management
- **Guards**: AuthGuard, RoleGuard, CanDeactivate
- **Interceptors**: Token injection, Error handling
- **Only imported in AppModule** - Singleton pattern
- No other modules should import from core

### `/src/app/shared`
Reusable across the application

- **Components**: Header, Footer, Navigation, UI Components
- **Pipes**: Custom pipes (date, currency, etc.)
- **Directives**: Custom directives for common behavior
- **Models/Interfaces**: Shared data structures
- Can be imported by any module

### `/src/app/features`
Feature-specific modules and components

- Each feature in its own folder
- Includes components, services, models
- Separate routing module
- Lazy loaded when possible

### `/src/app/app.module.ts`
Main application module

- Imports core module
- Declares shared module
- Configures routes
- Bootstraps AppComponent

## Data Flow Architecture

```mermaid
graph LR
    subgraph "Request Flow"
        A["Component"] -->|User Action| B["Service"]
        B -->|HTTP Request| C["Interceptor"]
        C -->|Add Token| D["API"]
        D -->|Response| C
        C -->|Transform| B
        B -->|Observable| A
        A -->|Render| E["Template"]
    end
```

## Component Hierarchy

```mermaid
graph TD
    A["AppComponent"] --> B["LayoutComponent"]
    B --> C["HeaderComponent"]
    B --> D["MainComponent"]
    B --> E["FooterComponent"]
    D --> F["FeatureComponent"]
    F --> G["ListComponent"]
    F --> H["DetailComponent"]
    G --> I["ItemComponent"]
```

## Service Layer Architecture

```mermaid
graph TD
    A["Component"] -->|Inject| B["Feature Service"]
    B -->|Inject| C["Core Service"]
    C -->|Inject| D["HttpClient"]
    B -->|Observable| A
    C -->|Error Handling| E["Error Handler"]
```

## Module Organization Pattern

```mermaid
graph LR
    A["AppModule"] -->|Imports| B["CoreModule"]
    A -->|Imports| C["SharedModule"]
    A -->|Lazy Load| D["FeatureModule1"]
    A -->|Lazy Load| E["FeatureModule2"]
    
    D --> D1["Components"]
    D --> D2["Services"]
    D --> D3["Routing"]
    
    B --> B1["Singleton Services"]
    C --> C1["Shared Components"]
```

## HTTP Communication Pattern

```mermaid
sequenceDiagram
    participant Component
    participant Service
    participant Interceptor
    participant HttpClient
    participant API
    
    Component->>Service: getData()
    Service->>HttpClient: get(url)
    HttpClient->>Interceptor: intercept
    Interceptor->>Interceptor: Add Auth Token
    Interceptor->>API: HTTP GET
    API-->>Interceptor: Response
    Interceptor->>Interceptor: Transform Data
    Interceptor-->>HttpClient: Transformed
    HttpClient-->>Service: Observable
    Service->>Service: Error Handling
    Service-->>Component: Observable<Data>
    Component->>Component: Update View
```

## Reactive Forms Pattern

```mermaid
graph TD
    A["FormBuilder"] -->|Create| B["FormGroup"]
    B --> C["FormControl"]
    B --> D["FormArray"]
    C -->|Validators| E["Validation"]
    E -->|Valid?| F["Component"]
    F -->|Bind| G["Template"]
    G -->|Change| H["(change)Event"]
    H -->|Update| B
```

## Change Detection Strategy

```mermaid
graph TD
    A["Input Changes"] -->|Default| B["Check All Components"]
    A -->|OnPush| C["Check Only if Input Changed"]
    C -->|Faster| D["Better Performance"]
    B -->|Slower| E["High Frequency Updates"]
    
    C --> F["Manual Detection"]
    F -->|ChangeDetectorRef| G["Improved Performance"]
```

## Lazy Loading Module Flow

```mermaid
graph LR
    A["App Loads"] -->|Bundle 1| B["AppModule"]
    B -->|Bundle 2| C["FeatureModule<br/>OnDemand"]
    A -->|Initial Load| D["Faster"]
    C -->|After Navigation| E["Route to Feature"]
```

## Error Handling Architecture

```mermaid
graph TD
    A["API Request"] --> B{Error?}
    B -->|No| C["Success Response"]
    B -->|Yes| D["Interceptor"]
    D -->|401| E["Redirect to Login"]
    D -->|403| F["Show Permission Error"]
    D -->|5xx| G["Retry Logic"]
    D -->|4xx| H["Show User Error"]
    
    E --> I["Component"]
    F --> I
    G --> I
    H --> I
```

## Folder Structure Example

```
src/
├── app/
│   ├── core/
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── user.service.ts
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── admin.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── core.module.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   └── footer/
│   │   ├── pipes/
│   │   │   └── custom.pipe.ts
│   │   ├── directives/
│   │   │   └── custom.directive.ts
│   │   └── shared.module.ts
│   │
│   ├── features/
│   │   ├── user/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── user-routing.module.ts
│   │   │   └── user.module.ts
│   │   │
│   │   └── admin/
│   │       ├── components/
│   │       ├── services/
│   │       ├── admin-routing.module.ts
│   │       └── admin.module.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

## State Management Options

### Simple State (BehaviorSubject)
```mermaid
graph LR
    A["BehaviorSubject<State>"] -->|subscribe| B["Component"]
    C["Service"] -->|next()| A
    B -->|Action| C
```

### Complex State (NgRx)
```mermaid
graph LR
    A["Store"] -->|select| B["Selector"]
    B -->|Observable| C["Component"]
    C -->|dispatch| D["Action"]
    D -->|reducer| E["New State"]
    E -->|Effects| F["Side Effects"]
    F -->|dispatch| D
```

## Best Practices Summary

1. **Separation of Concerns**
   - Components: Presentation only
   - Services: Business logic
   - Guards: Route protection
   - Interceptors: HTTP concerns

2. **Type Safety**
   - Strong TypeScript typing
   - Interfaces for all data
   - Avoid `any` type

3. **Reactive Programming**
   - Use Observables throughout
   - Proper subscription management
   - RxJS operators for composition

4. **Performance**
   - OnPush change detection
   - Lazy loading modules
   - Async pipe in templates
   - Unsubscribe in ngOnDestroy

5. **Testing**
   - Unit tests for all components
   - Mock services and HTTP
   - Test behavior not implementation

## Integration Points

```mermaid
graph TB
    A["Angular App"] --> B["API Service"]
    A --> C["State Management"]
    A --> D["Local Storage"]
    A --> E["Third-party Libraries"]
    B --> F["Backend API"]
    D --> G["Browser Storage"]
```
