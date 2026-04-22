# Python Feature Slice API Template (FastAPI)

Vertical slice FastAPI template with CQRS, Result pattern, OpenTelemetry, structured logging, Docker, and k6.

## Stack
- FastAPI + Uvicorn
- Validation: Pydantic models
- Data: async SQLAlchemy (placeholder repo)
- Logging: structlog
- Tracing: OpenTelemetry (OTLP)
- Tests: pytest/pytest-asyncio/httpx; k6
- Docker: api + Postgres + otel-collector

## Layout
```
app/
  main.py           # FastAPI init, routes, DI
  core/             # result, errors, logging, otel, db
  features/pizzas/
    create/
      dto.py
      handler.py
      routes.py
    get/
      dto.py
      handler.py
      routes.py
```

## Scripts
- `pip install -r requirements.txt`
- `uvicorn app.main:app --reload`
- `pytest`
- `k6 run k6/smoke.js`
- `docker compose up --build`

## Result Pattern
Handlers return `Result` (Ok/Err) and routers map to HTTP codes. Expected errors are not raised as exceptions.

## Telemetry
- OTel instrumented HTTP + Postgres (if configured)
- Trace ID added to logs

## Next Steps
- Implement real repository with SQLAlchemy
- Add migrations (Alembic) and seed data
- Extend features as new folders under `features/`
