# Java Feature Slice API Template (Spring Boot)

Vertical slice Spring Boot template with CQRS, Result pattern, OpenTelemetry, structured logging, Docker, and k6.

## Stack
- Spring Boot 3 (Web, Validation)
- Data: placeholder repo interface (swap JPA later)
- Logging: Logback JSON
- Tracing: OpenTelemetry (OTLP)
- Tests: JUnit 5, Spring Boot Test, Testcontainers-ready
- Docker: api + Postgres + otel-collector

## Layout
```
src/main/java/com/example/app/
  App.java
  core/Result.java
  core/ErrorCode.java
  features/pizza/
    create/...
    get/...
```

## Result Pattern
Handlers return `Result<T>` (Success/Failure). Controllers map to Problem Details style JSON.

## Telemetry
- OTel starter wiring (exporter endpoint from env)
- Trace ID included in logs

## Next Steps
- Add JPA + Flyway
- Add Testcontainers Postgres integration tests
- Extend features under `features/`
