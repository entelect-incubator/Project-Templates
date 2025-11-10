using Projects;

var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Api>("Api").WithExternalHttpEndpoints();

builder.Build().Run();
