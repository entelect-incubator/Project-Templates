# Frontend & Backend Integration Fixes - November 12, 2025

## Issues Resolved

This document summarizes all fixes applied to resolve the "process is not defined" and API 404 errors encountered during development.

### 1. ✅ Process Not Defined Errors (Browser Environment)

**Problem:** React components were using Node.js `process` global, which doesn't exist in browser environment.

**Files Fixed:**

#### Frontend React Template

1. **`src/components/common/GlobalErrorBoundary.tsx` (Line 57)**
   - **Before:** `if (process.env['NODE_ENV'] === 'production')`
   - **After:** `if (import.meta.env.PROD)`
   - **Reason:** Vite provides `import.meta.env.PROD` for browser code

2. **`src/lib/logger.ts` (Line 136)**
   - **Before:** `if (process.env['NODE_ENV'] === 'production' && loggedError.level === 'error')`
   - **After:** `if (import.meta.env.PROD && loggedError.level === 'error')`
   - **Reason:** Browser runtime doesn't have access to Node.js process object

3. **`src/config/environment.ts` (Line 25) - Fixed in Previous Session**
   - **Before:** `process.env["VITE_API_BASE_URL"]`
   - **After:** `import.meta.env['VITE_API_BASE_URL']`
   - **Reason:** Dynamic property access requires bracket notation in TypeScript strict mode

**Key Learning:** Vite automatically injects `import.meta.env` into all browser code. Use this instead of `process.env` for any environment variables.

---

### 2. ✅ API 404 Errors (Port Configuration)

**Problem:** Frontend trying to reach `https://localhost:5001` but API running on different port when using Aspire.

**Root Cause:**

- Standalone API runs on `https://localhost:5001`
- Aspire orchestration runs on `http://localhost:5000`
- Frontend configuration defaulted to port 5001

**Files Updated:**

#### `.env.example`

Added comprehensive documentation showing:

- Standalone API configuration (port 5001)
- Aspire configuration (port 5000 HTTP)
- How to choose which mode to use

```bash
# ASPIRE: http://localhost:5000
# STANDALONE: https://localhost:5001
VITE_API_BASE_URL=https://localhost:5001
```

---

### 3. ✅ Missing DI Handler Registration (.NET Backend)

**Problem:** `DeletePizzaCommand` handler was implemented but not registered in dependency injection containers.

**Error:**

```text
No service for type 'ICommandHandler<ICommand<Result<PizzaModel>>, Result<PizzaModel>>
```

**Files Fixed (All 5 Architecture Templates):**

1. `1.LayeredArchitecture/1.CleanTemplate/Core/DependencyInjection.cs`
2. `1.LayeredArchitecture/2.TemplateWithDataAccess/Core/DependencyInjection.cs`
3. `2.CleanArchitecture/Application/DependencyInjection.cs`
4. `3.VerticalSliceArchitecture/1.Traditional/Core/DependencyInjection.cs`
5. `3.VerticalSliceArchitecture/2.Minimal/Core/DependencyInjection.cs`

**Change:**
```csharp
// Added to each DI configuration
services.AddTransient<ICommandHandler<DeletePizzaCommand, Result>, DeletePizzaCommandHandler>();
```

---

## Documentation Added

### 1. `ASPIRE_SETUP.md` (NEW)

Comprehensive guide covering:

- **Quick Start:**
  - Standalone API setup (no Aspire)
  - Aspire setup with dashboard
  - Frontend/backend coordination

- **Architecture Templates:**
  - How to run each of the 3 templates with Aspire

- **OpenTelemetry Integration:**
  - Automatic instrumentation
  - Custom spans and tracing
  - Dashboard access

- **Troubleshooting:**
  - Common issues and solutions
  - Certificate handling
  - Port configuration

- **Production Deployment:**
  - Disabling Aspire in production
  - Exporting to external platforms
  - Configuration management

### 2. Updated `.env.example`

Added clear documentation:

```bash
# IMPORTANT: Backend Setup
# 1. Standalone API: https://localhost:5001 (default)
# 2. With Aspire: http://localhost:5000
# 3. Production: your-domain.com
```

---

## Running the Application

### Mode 1: Standalone (Simple)

```bash
# Terminal 1: Backend API
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/Api
dotnet run

# Terminal 2: Frontend
cd frontend/React/template
VITE_API_BASE_URL=https://localhost:5001 npm run dev
```

### Mode 2: With Aspire (Recommended for Development)

```bash
# Terminal 1: Aspire with orchestration
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/AspireHost
dotnet run

# Terminal 2: Frontend (separate terminal)
cd frontend/React/template
VITE_API_BASE_URL=http://localhost:5000 npm run dev
```

**Benefits of Aspire mode:**

- 📊 Real-time observability dashboard: `http://localhost:15258`
- 📈 Performance metrics and traces
- 🔍 Request/response details
- 💾 Structured logging
- ❤️ Automatic health checks

---

## Environment Variables Summary

### Frontend React

```typescript
// Vite automatically provides:
import.meta.env.DEV      // Boolean: true in development
import.meta.env.PROD     // Boolean: true in production
import.meta.env.MODE     // String: "development" or "production"

// Custom variables (must start with VITE_):
import.meta.env.VITE_API_BASE_URL  // API endpoint
```

**NOT available in browser:**

- `process.env` (Node.js only)
- `process.env.NODE_ENV` (Node.js only)

### Backend .NET

All DI handlers now registered in 5 architecture templates:

- ✅ CreatePizzaCommand
- ✅ UpdatePizzaCommand
- ✅ DeletePizzaCommand (newly fixed)
- ✅ CreateOrderCommand
- ✅ CompleteOrderCommand

---

## Testing the Fixes

### Test 1: Verify No Process Errors

```bash
cd frontend/React/template
npm run build  # Should compile without errors
npm run dev   # Should run without "process is not defined" error
```

✅ Expected: No ReferenceError about process

### Test 2: Verify API Connectivity

1. Start backend (Aspire or standalone)
2. Start frontend
3. Navigate to Pizza Menu
4. Check Console: Should see successful GET to `/api/pizzas`

✅ Expected: 200 OK response with pizza data (no 404)

### Test 3: Verify Error Boundary

1. In browser console:

```javascript
throw new Error("Test error");
```

2. Should see GlobalErrorBoundary fallback UI
3. Console should have no "process is not defined" error

✅ Expected: Error displayed properly, no process errors

### Test 4: Verify DI in .NET

```bash
cd backend/.NET/1.LayeredArchitecture/1.CleanTemplate/Api
dotnet run

# In browser, call:
DELETE https://localhost:5001/api/pizzas/1

# Should work without 500 error about missing handler
```

✅ Expected: 200 OK (with pizza deleted or appropriate response)

---

## Files Modified

### Frontend React

| File                                            | Changes                                   | Line(s) |
| ----------------------------------------------- | ----------------------------------------- | ------- |
| `src/components/common/GlobalErrorBoundary.tsx` | `process.env` → `import.meta.env.PROD`    | 57      |
| `src/lib/logger.ts`                             | `process.env` → `import.meta.env.PROD`    | 136     |
| `src/config/environment.ts`                     | Added bracket notation for dynamic access | 25      |
| `.env.example`                                  | Added Aspire setup documentation          | 1-20    |

### Backend .NET

| File                                                                          | Changes                                      |
| ----------------------------------------------------------------------------- | -------------------------------------------- |
| `1.LayeredArchitecture/1.CleanTemplate/Core/DependencyInjection.cs`           | Added DeletePizzaCommandHandler registration |
| `1.LayeredArchitecture/2. TemplateWithDataAccess/Core/DependencyInjection.cs` | Added DeletePizzaCommandHandler registration |
| `2.CleanArchitecture/Application/DependencyInjection.cs`                      | Added DeletePizzaCommandHandler registration |
| `3.VerticalSliceArchitecture/1.Traditional/Core/DependencyInjection.cs`       | Added DeletePizzaCommandHandler registration |
| `3.VerticalSliceArchitecture/2.Minimal/Core/DependencyInjection.cs`           | Added DeletePizzaCommandHandler registration |

### Documentation

| File              | Status                               |
| ----------------- | ------------------------------------ |
| `ASPIRE_SETUP.md` | ✅ NEW - Comprehensive guide          |
| `.env.example`    | ✅ UPDATED - Added setup instructions |

---

## Key Takeaways

### 1. Browser vs Node.js Context

- **Browser:** Use `import.meta.env` (Vite)
- **Node.js:** Use `process.env`
- **Never mix:** They're different contexts

### 2. API Configuration

- **Know your ports:** Standalone vs Aspire use different ports
- **Use environment files:** `.env` for local overrides
- **Document clearly:** Help future developers understand the choices

### 3. Dependency Injection

- **Register all handlers:** Don't implement without registering
- **Test the full path:** Make sure DI is properly configured
- **Use consistent patterns:** All templates should follow the same registration style

### 4. Observability

- **Use Aspire for development:** Dashboard helps catch issues early
- **Traces tell the story:** Follow requests through the system
- **Export in production:** Use external platforms (Datadog, New Relic, etc.)

---

## Related Documentation

- `ASPIRE_SETUP.md` - Complete Aspire and OpenTelemetry guide
- `backend/.NET/README.md` - Architecture template documentation
- `frontend/React/template/GET_STARTED.md` - Frontend setup guide

---

**Status:** ✅ All issues resolved and documented
**Last Updated:** November 12, 2025
**Tested With:** .NET 9.0, Node.js 20.x, React 19.2, Vite 5.x
