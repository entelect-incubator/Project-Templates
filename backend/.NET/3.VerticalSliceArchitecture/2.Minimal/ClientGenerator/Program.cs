using System.CommandLine;
using System.CommandLine.Builder;
using System.CommandLine.Invocation;
using System.CommandLine.Parsing;
using NSwag;
using NSwag.CodeGeneration.CSharp;
using NSwag.CodeGeneration.TypeScript;
using Serilog;

namespace ClientGenerator;

internal class Program
{
    static async Task<int> Main(string[] args)
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .WriteTo.Console()
            .CreateLogger();

        var rootCommand = new RootCommand("OpenAPI Client Generator - Generate API clients for C#, TypeScript, and more");

        // Shared options
        var swaggerUrlOption = new Option<string>(
            new[] { "--swagger-url", "-s" },
            "URL to the OpenAPI/Swagger specification")
        {
            IsRequired = true
        };

        var outputDirOption = new Option<string>(
            new[] { "--output-dir", "-o" },
            () => "./generated-clients",
            "Output directory for generated clients");

        var namespaceOption = new Option<string>(
            new[] { "--namespace", "-n" },
            () => "Api.Client",
            "Namespace for generated C# clients");

        // CSharp command
        var csharpCommand = new Command("csharp", "Generate C# client")
        {
            swaggerUrlOption,
            outputDirOption,
            namespaceOption
        };

        csharpCommand.SetHandler(
            async (swaggerUrl, outputDir, @namespace) =>
            {
                await GenerateCSharpClient(swaggerUrl, outputDir, @namespace);
            },
            swaggerUrlOption, outputDirOption, namespaceOption);

        // TypeScript command
        var typeScriptCommand = new Command("typescript", "Generate TypeScript client")
        {
            swaggerUrlOption,
            outputDirOption
        };

        var typeScriptFrameworkOption = new Option<string>(
            new[] { "--framework", "-f" },
            () => "fetch",
            "Framework to use: 'fetch', 'angular', 'react'");

        typeScriptCommand.AddOption(typeScriptFrameworkOption);
        typeScriptCommand.SetHandler(
            async (swaggerUrl, outputDir, framework) =>
            {
                await GenerateTypeScriptClient(swaggerUrl, outputDir, framework);
            },
            swaggerUrlOption, outputDirOption, typeScriptFrameworkOption);

        // All command (generate all supported clients)
        var allCommand = new Command("all", "Generate all supported clients (C#, TypeScript)")
        {
            swaggerUrlOption,
            outputDirOption,
            namespaceOption
        };

        allCommand.SetHandler(
            async (swaggerUrl, outputDir, @namespace) =>
            {
                Log.Information("?? Generating all clients...\n");
                await GenerateCSharpClient(swaggerUrl, Path.Combine(outputDir, "csharp"), @namespace);
                Log.Information("");
                await GenerateTypeScriptClient(swaggerUrl, Path.Combine(outputDir, "typescript"), "fetch");
                Log.Information("\n? All clients generated successfully!");
            },
            swaggerUrlOption, outputDirOption, namespaceOption);

        rootCommand.AddCommand(csharpCommand);
        rootCommand.AddCommand(typeScriptCommand);
        rootCommand.AddCommand(allCommand);

        // Parse and invoke
        var parser = new CommandLineBuilder(rootCommand)
            .UseDefaults()
            .Build();

        return await parser.InvokeAsync(args);
    }

    private static async Task GenerateCSharpClient(string swaggerUrl, string outputDir, string @namespace)
    {
        try
        {
            Log.Information("?? Generating C# client...");
            Log.Information("   Swagger URL: {SwaggerUrl}", swaggerUrl);
            Log.Information("   Output: {OutputDir}", outputDir);
            Log.Information("   Namespace: {@Namespace}", @namespace);

            Directory.CreateDirectory(outputDir);

            // Download OpenAPI spec
            var document = await OpenApiDocument.FromUrlAsync(swaggerUrl);

            // Configure C# generator
            var settings = new CSharpClientGeneratorSettings
            {
                ClassName = "ApiClient",
                Namespace = @namespace,
                UseHttpClientCreationMethod = true,
                GenerateClientClasses = true,
                GenerateExceptionClasses = true,
                GenerateDataAnnotations = true,
            };

            var generator = new CSharpClientGenerator(document, settings);
            var code = generator.GenerateFile();

            // Write to file
            var filePath = Path.Combine(outputDir, "ApiClient.cs");
            await File.WriteAllTextAsync(filePath, code);

            Log.Information("? C# client generated successfully!");
            Log.Information("   File: {FilePath}", Path.GetFullPath(filePath));
        }
        catch (Exception ex)
        {
            Log.Error(ex, "? Error generating C# client");
            throw;
        }
    }

    private static async Task GenerateTypeScriptClient(string swaggerUrl, string outputDir, string framework)
    {
        try
        {
            Log.Information("?? Generating TypeScript client ({Framework})...", framework);
            Log.Information("   Swagger URL: {SwaggerUrl}", swaggerUrl);
            Log.Information("   Output: {OutputDir}", outputDir);

            Directory.CreateDirectory(outputDir);

            // Download OpenAPI spec
            var document = await OpenApiDocument.FromUrlAsync(swaggerUrl);

            // Configure TypeScript generator
            var settings = new TypeScriptClientGeneratorSettings
            {
                ClassName = "ApiClient",
                GenerateClientClasses = true,
                TypeScriptVersion = "4.0",
                PromiseType = PromiseType.Promise,
            };

            var generator = new TypeScriptClientGenerator(document, settings);
            var code = generator.GenerateFile();

            // Write to file
            var fileName = framework switch
            {
                "angular" => "api.service.ts",
                "react" => "useApi.ts",
                _ => "api-client.ts"
            };

            var filePath = Path.Combine(outputDir, fileName);
            await File.WriteAllTextAsync(filePath, code);

            Log.Information("? TypeScript client generated successfully!");
            Log.Information("   File: {FilePath}", Path.GetFullPath(filePath));
        }
        catch (Exception ex)
        {
            Log.Error(ex, "? Error generating TypeScript client");
            throw;
        }
    }
}
