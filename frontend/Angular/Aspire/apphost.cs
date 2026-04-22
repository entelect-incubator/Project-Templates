#:sdk Aspire.AppHost.Sdk@13.0.0
#:package Aspire.Hosting.JavaScript@13.0.0

using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var app = builder.AddProject("pizzaapi", "../../../backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Api/Api.csproj")
    .WithOtlpExporter()
    .WithExternalHttpEndpoints();

var frontend = builder.AddViteApp("frontend", "../../../frontend/Angular", "start")
    .WithReference(app)
    .WaitFor(app)
    .WithExternalHttpEndpoints();

builder.Build().Run();
