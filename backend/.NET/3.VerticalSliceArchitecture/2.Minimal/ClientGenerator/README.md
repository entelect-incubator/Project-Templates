# OpenAPI Client Generator

Generates API client code for multiple languages and frameworks from an OpenAPI/Swagger specification.

## Usage

### Generate C# Client

```bash
dotnet run -- csharp -s https://localhost:5001/swagger/v1/swagger.json -o ./clients -n "MyApp.Api.Client"
```

**Options:**
- `-s, --swagger-url`: URL to the OpenAPI specification (required)
- `-o, --output-dir`: Output directory (default: `./generated-clients`)
- `-n, --namespace`: C# namespace (default: `Api.Client`)

### Generate TypeScript Client

```bash
dotnet run -- typescript -s https://localhost:5001/swagger/v1/swagger.json -o ./clients -f fetch
```

**Options:**
- `-s, --swagger-url`: URL to the OpenAPI specification (required)
- `-o, --output-dir`: Output directory (default: `./generated-clients`)
- `-f, --framework`: Framework: `fetch`, `angular`, `react` (default: `fetch`)

### Generate All Clients

```bash
dotnet run -- all -s https://localhost:5001/swagger/v1/swagger.json -o ./clients
```

Generates:
- `./clients/csharp/ApiClient.cs` - C# client
- `./clients/typescript/api-client.ts` - TypeScript client (Fetch API)

## Examples

### Local Development

With Aspire running on localhost:

```bash
dotnet run -- all -s https://localhost:5001/swagger/v1/swagger.json -o ../../generated-clients
```

### Production API

```bash
dotnet run -- csharp -s https://api.example.com/swagger/v1/swagger.json -o ./csharp-client -n "CompanyName.ProductName.Client"
```

### React Application

```bash
dotnet run -- typescript -s https://api.example.com/openapi.json -o ../web-app/src/api -f react
```

### Angular Application

```bash
dotnet run -- typescript -s https://api.example.com/openapi.json -o ../angular-app/src/app/services -f angular
```

## Folder Structure

After generation, your clients are organized as:

```
generated-clients/
??? csharp/
?   ??? ApiClient.cs           # C# client
??? typescript/
    ??? api-client.ts          # TypeScript client
```

## Integration with Your Project

### C# Client (In Api.Client Project)

1. Generate: `dotnet run -- csharp -s https://localhost:5001/swagger/v1/swagger.json -o ../../Api.Client`
2. Copy `ApiClient.cs` to `Api.Client` folder
3. Reference in your project:

```csharp
var client = new ApiClient("https://api.example.com", httpClient);
var pizzas = await client.GetAllPizzasAsync(...);
```

### React Client (In Frontend App)

1. Generate: `dotnet run -- typescript -s https://localhost:5001/swagger/v1/swagger.json -o ../web-app/src/api -f react`
2. Use in your component:

```typescript
import { ApiClient } from './api/api-client';

const client = new ApiClient('https://api.example.com');
const pizzas = await client.getAllPizzas();
```

### Angular Client (In Angular App)

1. Generate: `dotnet run -- typescript -s https://localhost:5001/swagger/v1/swagger.json -o ../angular-app/src/app/services -f angular`
2. Use in your service:

```typescript
import { ApiClient } from './api-client';

@Injectable()
export class PizzaService {
  constructor(private apiClient: ApiClient) {}
  
  getPizzas() {
    return this.apiClient.getAllPizzas();
  }
}
```

## Troubleshooting

### SSL Certificate Issues

For local development with self-signed certificates:

```bash
# On Windows
set NODE_TLS_REJECT_UNAUTHORIZED=0
dotnet run -- all -s https://localhost:5001/swagger/v1/swagger.json

# On Linux/Mac
export NODE_TLS_REJECT_UNAUTHORIZED=0
dotnet run -- all -s https://localhost:5001/swagger/v1/swagger.json
```

### OpenAPI URL Not Accessible

1. Ensure API is running
2. Check URL format: `https://host:port/swagger/v1/swagger.json`
3. Verify network connectivity

## Architecture

```
ClientGenerator (Console App)
??? Program.cs (CLI entry point)
??? NSwag Libraries
?   ??? CSharp Generation
?   ??? TypeScript Generation
?   ??? OpenAPI Parsing
??? Output
    ??? C# Clients
    ??? TypeScript Clients
```

## Future Enhancements

- [ ] Support for Java client generation
- [ ] Support for Go client generation
- [ ] Batch generation from multiple APIs
- [ ] Configuration file support (JSON/YAML)
- [ ] Custom template support
- [ ] Automatic file packaging/versioning
