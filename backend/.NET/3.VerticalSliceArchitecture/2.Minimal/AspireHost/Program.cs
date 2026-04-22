using Projects;

var builder = DistributedApplication.CreateBuilder(args);

// Add PostgreSQL database with fixed password for development
// This prevents password mismatch errors when the container is restarted
var postgresPassword = builder.AddParameter("postgres-password", secret: true);
var postgres = builder.AddPostgres("postgres", password: postgresPassword)
    .WithImageTag("17-alpine")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent);

var database = postgres.AddDatabase("pizzadb");

// Add API project with PostgreSQL connection
// Aspire automatically injects OTEL_EXPORTER_OTLP_ENDPOINT environment variable
var api = builder.AddProject<Api>("Api")
    .WithReference(database)
    .WaitFor(database)
    .WithOtlpExporter();

builder.Build().Run();
