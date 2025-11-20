# OpenAPI Client Generation (Planned Feature)

## Overview

This document outlines the plan for adding an OpenAPI client generation CLI tool to the solution.

**Status:** ? Planned (Phase 2)

---

## Goals

1. ? **Interactive CLI**: User-friendly console application
2. ? **Multi-Language Support**: TypeScript, C#, etc.
3. ? **Output Customization**: Specify output directories
4. ? **Configuration**: Save/reuse generation settings

---

## Planned Usage

```bash
# Simple usage
dotnet run --project ApiClientGenerator

# Or via command-line arguments
dotnet run --project ApiClientGenerator -- \
  --api-url http://localhost:5000/openapi/v1.json \
  --output-dir ./clients/generated \
  --language typescript

# Multiple clients in one command
dotnet run --project ApiClientGenerator -- \
  --api-url http://localhost:5000/openapi/v1.json \
  --output-dir ./clients/generated \
  --languages typescript csharp
```

---

## Architecture

```
solution/
??? ApiClientGenerator/
?   ??? Program.cs
?   ??? ApiClientGenerator.csproj
?   ??? Commands/
?   ?   ??? GenerateCommand.cs
?   ?   ??? ConfigCommand.cs
?   ??? Services/
?   ?   ??? OpenApiService.cs
?   ?   ??? NSwagService.cs
?   ?   ??? CodeGenerationService.cs
?   ??? Models/
?       ??? GenerationOptions.cs
?       ??? ClientConfig.cs
```

---

## Technology Stack

- **CLI Framework**: `System.CommandLine` (built-in .NET)
- **Code Generation**: `NSwag.CodeGeneration`
- **HTTP**: `HttpClient` for fetching OpenAPI specs

---

## Features (Phase 1)

### 1. Interactive Mode

```
?? Pizza API Client Generator

Enter API endpoint URL [default: http://localhost:5000/openapi/v1.json]:
> 

Select output language:
  1. TypeScript
  2. C#
  3. Angular

> 1

Output directory [default: ./clients/generated]:
> ./apps/web/src/api

Generating...
? Generated 1,234 lines of TypeScript code
?? Saved to: ./apps/web/src/api/generated.ts

Generate another? (y/n)
> n

Done!
```

### 2. Command-Line Mode

```bash
# Generate TypeScript client
dotnet run --project ApiClientGenerator -- \
  --endpoint http://localhost:5000/openapi/v1.json \
  --output ./clients/generated \
  --language typescript \
  --no-confirm

# Generate multiple clients
dotnet run --project ApiClientGenerator -- \
  --endpoint http://localhost:5000/openapi/v1.json \
  --output ./clients \
  --language typescript \
  --generate-csharp \
  --no-confirm
```

### 3. Configuration File

Create `.clientgen.json` in project root:

```json
{
  "apiEndpoint": "http://localhost:5000/openapi/v1.json",
  "clients": [
    {
      "name": "web",
      "language": "typescript",
      "outputDirectory": "./apps/web/src/api",
      "namespace": "PizzaApi"
    },
    {
      "name": "desktop",
      "language": "csharp",
      "outputDirectory": "./src/Api.Client",
      "namespace": "PizzaApi.Generated"
    }
  ]
}
```

Then simply run:

```bash
dotnet run --project ApiClientGenerator
```

---

## Implementation Plan

### Phase 1: Basic Implementation

**Timeline:** Week 1-2

```csharp
// Program.cs
var root = new RootCommand("Pizza API Client Generator");

// Global options
var apiUrlOption = new Option<string>(
    aliases: new[] { "--api-url", "-u" },
    description: "OpenAPI spec URL",
    getDefaultValue: () => "http://localhost:5000/openapi/v1.json");

var outputDirOption = new Option<string>(
    aliases: new[] { "--output-dir", "-o" },
    description: "Output directory for generated code",
    getDefaultValue: () => "./clients/generated");

var languageOption = new Option<string>(
    aliases: new[] { "--language", "-l" },
    description: "Target language (typescript, csharp)",
    getDefaultValue: () => "typescript");

// Add command
var generateCommand = new Command("generate", "Generate API client");
generateCommand.Add(apiUrlOption);
generateCommand.Add(outputDirOption);
generateCommand.Add(languageOption);

generateCommand.SetHandler(async (apiUrl, outputDir, language) =>
{
    var generator = new ClientGenerator();
    await generator.GenerateAsync(apiUrl, outputDir, language);
}, apiUrlOption, outputDirOption, languageOption);

root.AddCommand(generateCommand);
return await root.InvokeAsync(args);
```

### Phase 2: Configuration & Profiles

**Timeline:** Week 3

- `.clientgen.json` support
- Profile management
- Generation presets

### Phase 3: Advanced Features

**Timeline:** Week 4+

- Watch mode (regenerate on API changes)
- Git integration (auto-commit generated code)
- Slack/webhook notifications
- Docker support

---

## Current Progress

| Feature | Status | Notes |
|---------|--------|-------|
| Interactive CLI | ? TODO | Design complete |
| TypeScript Gen | ? TODO | Using NSwag |
| C# Gen | ? TODO | Using NSwag |
| Config Files | ? TODO | `.clientgen.json` |
| Watch Mode | ? TODO | Phase 2+ |

---

## Dependencies to Add

When implementing, add these NuGet packages:

```bash
dotnet add package System.CommandLine
dotnet add package NSwag.CodeGeneration
dotnet add package NSwag.Core
dotnet add package System.Text.Json
```

---

## Example Output

### TypeScript Generated Client

```typescript
// Generated by Pizza API Client Generator v1.0.0
// API: http://localhost:5000/openapi/v1.json
// Generated: 2025-11-14

export class PizzaApiClient {
  private http: HttpClient;
  private baseUrl: string = "http://localhost:5000";

  constructor(baseUrl?: string, http?: HttpClient) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.http = http || new HttpClient();
  }

  /**
   * Get all pizzas
   */
  getAllPizzas(query?: GetAllPizzasQuery): Promise<ResultOfIEnumerableOfPizzaModel> {
    // Implementation...
  }

  /**
   * Create a new pizza
   */
  createPizza(command: CreatePizzaCommand): Promise<ResultOfPizzaModel> {
    // Implementation...
  }
}
```

### C# Generated Client

```csharp
// Generated by Pizza API Client Generator v1.0.0
namespace PizzaApi.Generated
{
    public class PizzaApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;

        public PizzaApiClient(string baseUrl = "http://localhost:5000")
        {
            _baseUrl = baseUrl;
            _httpClient = new HttpClient();
        }

        /// <summary>
        /// Get all pizzas
        /// </summary>
        public async Task<ResultOfIEnumerableOfPizzaModel> GetAllPizzasAsync(
            GetAllPizzasQuery query = null)
        {
            // Implementation...
        }
    }
}
```

---

## Testing

```bash
# After implementation:

# Test interactive mode
dotnet run --project ApiClientGenerator

# Test CLI mode
dotnet run --project ApiClientGenerator -- \
  --api-url http://localhost:5000/openapi/v1.json \
  --output-dir ./test-output \
  --language typescript

# Verify generated code
cat ./test-output/generated.ts
```

---

## Related Resources

- [NSwag Documentation](https://github.com/RicoSuter/NSwag)
- [System.CommandLine](https://learn.microsoft.com/en-us/dotnet/standard/commandline/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)

---

## Notes

- This is a **planned feature** for future implementation
- Current implementation supports manual client generation via NSwag CLI
- See `Api.Client/Api.v1.nswag` for current setup

---

**Status:** ? Planned for Phase 2
**Priority:** Medium
**Complexity:** Medium (CLI + NSwag integration)
