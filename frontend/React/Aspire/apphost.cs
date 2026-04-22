#!/usr/bin/env dotnet
#:sdk Aspire.AppHost.Sdk@13.0.0

var builder = DistributedApplication.CreateBuilder(args);

// Add the .NET API service for Pizza Ordering
var api = builder.AddProject<Projects.Api>("pizza-api")
    .WithHttpEndpoint(port: 7160, isProduction: false)
    .WithHttpsEndpoint(port: 7161, isProduction: false)
    .WithEnvironment("ASPNETCORE_ENVIRONMENT", "Development");

// Configure OpenTelemetry for observability
// The API will send traces and metrics to the local OTLP collector
api.WithEnvironment("OTEL_EXPORTER_OTLP_PROTOCOL", "http/protobuf")
   .WithEnvironment("OTEL_EXPORTER_OTLP_ENDPOINT", "http://localhost:21007");

builder.Build().Run();
