# OpenAPI Client Generation Guide

## Overview

This guide explains how to set up and use automated TypeScript/React client generation from your OpenAPI specification using NSwag.

## Architecture

```
Backend (.NET)
    ↓
    └─→ OpenAPI Specification (http://localhost:5000/openapi/v1.json)
            ↓
            └─→ NSwag Generator
                    ↓
                    └─→ Generated Client (clients/generated/react/src/api/generated.ts)
                            ↓
                            └─→ API Client Adapter (frontend/React/template/src/api/client-adapter.ts)
                                    ↓
                                    └─→ React Hooks & Components
```

## Quick Start

### 1. Windows

```batch
cd clients/generation
.\generate-react-client.bat
```

### 2. macOS/Linux

```bash
cd clients/generation
chmod +x generate-react-client.sh
./generate-react-client.sh
```

### 3. From React Project

```bash
cd frontend/React/template
npm run generate:client
```

## Prerequisites

### Required

- **Node.js 18+** - JavaScript runtime
- **.NET 10 SDK** - For backend API compilation
- **NSwag CLI** - OpenAPI code generator

### Installation

#### Install NSwag Globally (Recommended)

```bash
npm install -g @nswag/cli
```

#### Or Install Locally in Generation Folder

```bash
cd clients/generation
npm install
```

#### Verify Installation

```bash
nswag --version
```

## Configuration

### React OpenAPI Configuration

**File:** `clients/generation/openapi-generator-react.json`

Key settings:

```json
{
  "codeGenerators": {
    "openApiToTypeScriptClient": {
      "className": "TodoApiClient",
      "template": "Fetch",
      "typeScriptVersion": 5.0,
      "generateCancelToken": true,
      "generateOptionalParameters": true,
      "output": "../generated/react/src/api/generated.ts"
    }
  }
}
```

**Template Options:**
- `Fetch` - Modern Fetch API (recommended for React)
- `Axios` - Axios HTTP client
- `Angular` - Angular HttpClient

## Generation Scripts

### React Client Generation Script

**Location:** `clients/generation/generate-react-client.bat` (Windows) or `generate-react-client.sh` (Unix)

**Features:**

✅ Checks for required tools (NSwag)  
✅ Verifies API is running  
✅ Downloads OpenAPI specification  
✅ Generates TypeScript client  
✅ Creates export barrel (index.ts)  
✅ Formats code with Prettier  
✅ Generates documentation

**Usage:**

```bash
# Generate from default localhost:5000
./generate-react-client.sh

# Generate from custom URL
./generate-react-client.sh http://api.example.com

# Generate from custom URL with custom backend path
./generate-react-client.sh http://api.example.com ../../backend/.NET/template
```

## Generated Files

After running generation:

```
clients/generated/react/
├── src/
│   └── api/
│       ├── generated.ts    # Main generated client and types
│       ├── index.ts        # Export barrel
│       └── README.md       # Auto-generated docs
```

## Using the Generated Client

### Option 1: Direct Usage

```typescript
import { TodoApiClient } from '../../../clients/generated/react/src/api/generated';

const apiClient = new TodoApiClient('http://localhost:5000');
const todos = await apiClient.getTodos(1, 10);
```

### Option 2: Via Adapter (Recommended)

The adapter provides additional features like retries and logging:

```typescript
import apiClient from '@/api/client-adapter';

// Get todos
const todos = await apiClient.getTodos(1, 10);

// Create todo
const newTodo = await apiClient.createTodo({
  title: 'New Todo',
  description: 'Description',
});

// Update todo
const updated = await apiClient.updateTodo('todo-id', {
  completed: true,
});

// Delete todo
await apiClient.deleteTodo('todo-id');

// Search todos
const results = await apiClient.searchTodos('query', 1, 10);
```

## Integration with React Hooks

The generated client can be used with React Query hooks:

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/api/client-adapter';

// Fetch todos
export function useTodos(page: number, pageSize: number) {
  return useQuery({
    queryKey: ['todos', page, pageSize],
    queryFn: ({ signal }) => apiClient.getTodos(page, pageSize, { signal }),
    staleTime: 5 * 60 * 1000,
  });
}

// Create todo
export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command) => apiClient.createTodo(command),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
```

## NPM Scripts

### In React Project

```bash
# Generate client from defaults
npm run generate:client

# Generate from specific URL
npm run generate:client:dev  # Uses http://localhost:5000
```

### In Generation Folder

```bash
cd clients/generation
npm install  # Install dependencies

# Generate React client
npm run generate:react

# Generate all clients
npm run generate

# Setup NSwag globally
npm run setup
```

## Troubleshooting

### Error: "nswag: command not found"

**Solution:** Install NSwag globally

```bash
npm install -g @nswag/cli
```

### Error: "API might not be running"

**Solution:** Start your backend API

```bash
cd backend/.NET/template
dotnet run
```

### Error: "Failed to download OpenAPI specification"

**Solution:** Verify the API URL

```bash
# Test the API endpoint
curl http://localhost:5000/openapi/v1.json
```

### Generated types don't match backend

**Solution:** Regenerate the client after backend changes

```bash
npm run generate:client
```

## Best Practices

### ✅ Do's

- ✅ Regenerate client after backend API changes
- ✅ Commit generated files to version control
- ✅ Use the adapter wrapper for additional features
- ✅ Keep NSwag configuration in version control
- ✅ Run generation as part of CI/CD pipeline

### ❌ Don'ts

- ❌ Don't manually edit generated client files
- ❌ Don't commit only partial generation
- ❌ Don't change NSwag version without testing
- ❌ Don't use generated client directly in production without adapter

## Environment Variables

Set in `frontend/React/template/.env`:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:5000

# Or for production
VITE_API_BASE_URL=https://api.example.com
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Generate API Client
  run: |
    cd clients/generation
    npm install -g @nswag/cli
    ./generate-react-client.sh http://localhost:5000
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
npm run generate:client
npm run type-check
```

## Switching Between Manual and Generated Implementation

### Current State (Manual)

The adapter currently uses manual fetch implementation for compatibility.

### To Use Generated Client

1. **Generate the client:**
   ```bash
   npm run generate:client
   ```

2. **Update adapter to use generated client:**
   ```typescript
   // Uncomment in src/api/client-adapter.ts
   import { TodoApiClient } from '@/api/generated';
   
   export class ApiClientAdapter {
     private generatedClient = new TodoApiClient();
     
     async getTodos(page, pageSize, options) {
       return this.executeWithRetry(
         () => this.generatedClient.getTodos(page, pageSize),
         'getTodos',
         options
       );
     }
   }
   ```

3. **Test thoroughly:**
   ```bash
   npm run type-check
   npm run test
   ```

## Additional Resources

- [NSwag Documentation](https://github.com/RicoSuter/NSwag)
- [OpenAPI Specification](https://swagger.io/specification/)
- [TypeScript OpenAPI Code Generator](https://github.com/RicoSuter/NSwag/wiki/TypeScriptClient)
- [React Query Documentation](https://tanstack.com/query/latest)

## Support

For issues or questions:

1. Check the generated client documentation
2. Verify the OpenAPI specification is valid
3. Ensure backend API is running
4. Check NSwag configuration
5. Review error logs in generation scripts

---

**Last Updated:** November 2025
