# Quick Reference: OpenAPI Generation

## Installation

```bash
npm install -g @nswag/cli
```

## Generate Client

### Windows
```batch
cd clients/generation
.\generate-react-client.bat
```

### macOS/Linux
```bash
cd clients/generation
./generate-react-client.sh
```

### From React Project
```bash
cd frontend/React/template
npm run generate:client
```

## Generated Output

```
clients/generated/react/src/api/
├── generated.ts    # Auto-generated client and types (DO NOT EDIT)
├── index.ts        # Export barrel
└── README.md       # Auto-generated documentation
```

## Use in Code

### Import Types
```typescript
import type { TodoDto, PaginatedTodosDto } from '@/features/todos/types';
```

### Use Adapter
```typescript
import apiClient from '@/api/client-adapter';

// Get todos
const todos = await apiClient.getTodos(1, 10);

// Create todo
await apiClient.createTodo({ title: 'New' });

// Update todo
await apiClient.updateTodo('id', { completed: true });

// Delete todo
await apiClient.deleteTodo('id');

// Search
const results = await apiClient.searchTodos('query');
```

### Use with React Query
```typescript
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api/client-adapter';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => apiClient.getTodos(),
  });
}
```

## Configuration Files

### `openapi-generator-react.json`
- Template: `Fetch` (modern Fetch API)
- Language: TypeScript 5.0
- Output: `../generated/react/src/api/generated.ts`

### `package.json` (in generation folder)
- Scripts for `generate:react`
- Setup for `@nswag/cli`

## Key Features

✅ Type-safe client generation  
✅ Automatic retry logic in adapter  
✅ Dev mode logging  
✅ Error handling  
✅ AbortSignal support  
✅ React Query compatible  

## Common Tasks

### Regenerate After Backend Changes
```bash
npm run generate:client
```

### Use Custom API URL
```bash
./generate-react-client.sh http://api.example.com
```

### Install NSwag Locally
```bash
cd clients/generation && npm install
```

### Check Generated File
```
clients/generated/react/src/api/generated.ts
```

## Troubleshooting

| Problem                    | Solution                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| `nswag: command not found` | `npm install -g @nswag/cli`                                           |
| API not running            | Start backend: `dotnet run` in backend folder                         |
| Generation fails           | Verify OpenAPI endpoint: `curl http://localhost:5000/openapi/v1.json` |
| TypeScript errors          | Run `npm run type-check` after generation                             |

## Links

- **Generation Scripts:** `clients/generation/`
- **Generated Client:** `clients/generated/react/src/api/`
- **Adapter:** `frontend/React/template/src/api/client-adapter.ts`
- **Guide:** `clients/generation/OPENAPI_GENERATION_GUIDE.md`
- **Configuration:** `clients/generation/openapi-generator-react.json`
