using Projects;

var builder = DistributedApplication.CreateBuilder(args);

// Add PostgreSQL database with automatic setup
var postgres = builder.AddPostgres("postgres")
    .WithImageTag("17-alpine")
    .WithDataVolume()
    .WithLifetime(ContainerLifetime.Persistent);

var database = postgres.AddDatabase("pizzadb");

// Add API project with PostgreSQL connection
var api = builder.AddProject<Api>("Api")
    .WithReference(database)
    .WaitFor(database);

builder.Build().Run();
