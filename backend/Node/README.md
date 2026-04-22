# Node Feature Slice API Template (Vertical Slice)

Feature-first (vertical slice) Express template with CQRS, Result pattern, OpenTelemetry, structured logging, Docker, and k6.

## Why
- Faster changes: all code for a feature lives together
- Safer changes: Result pattern + validation + tests
- Operable: OTel traces + structured logs + k6 performance baselines

## Stack
- Express + TypeScript
- Validation: Zod
- Data: pg (placeholder repo abstraction)
- Logging: pino
- Tracing: OpenTelemetry (OTLP to collector)
- Tests: vitest/supertest, k6
- Docker: app + Postgres + otel-collector

## Layout
```
src/
  app.ts           # wire DI, middlewares, routes, otel
  routes.ts        # mounts feature routers
  core/            # result, logger, otel, db
  features/
    pizzas/
      create/
        command.ts
        handler.ts
        route.ts
      get/
        query.ts
        handler.ts
        route.ts
```

## Scripts
- `npm run dev` – start with ts-node-dev
- `npm test` – unit + integration
- `npm run k6:smoke` / `npm run k6:load`
- `docker compose up --build`

## Environment
- `PORT` (default 3000)
- `DATABASE_URL` (postgres connection)
- `OTEL_EXPORTER_OTLP_ENDPOINT` (collector)

## Testing
- Unit: vitest on handlers (mock repo)
- Integration: supertest against express app with test DB
- k6: smoke + load profiles under `k6/`

## Result Pattern
Handlers return `Result<T>`; HTTP layer maps to Problem Details style responses. No naked throws for expected flows.

## Telemetry
- HTTP server + pg client instrumentation
- Trace ID injected into logs

## Next Steps
- Add real repo implementation (pg, drizzle/prisma/knex)
- Add migrations (drizzle/knex) and seed data
- Extend features as new folders under `features/`
