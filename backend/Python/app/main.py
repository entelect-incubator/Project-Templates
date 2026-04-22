from fastapi import FastAPI
from fastapi import Request
from fastapi.responses import JSONResponse
import os
import time
from app.core.logging import logger
from app.core.otel import setup_otel
from app.features.pizzas.create.routes import router as create_router
from app.features.pizzas.get.routes import router as get_router

_window_ms = int(os.getenv("RATE_LIMIT_WINDOW_MS", "60000"))
_max_requests = int(os.getenv("RATE_LIMIT_MAX", "100"))
_request_buckets: dict[str, tuple[int, float]] = {}

setup_otel()
app = FastAPI(title="Python Feature Slice API")


@app.middleware("http")
async def security_middleware(request: Request, call_next):
	client = request.client.host if request.client else "unknown"
	now = time.time() * 1000
	count, reset_at = _request_buckets.get(client, (0, now + _window_ms))

	if now > reset_at:
		count, reset_at = 0, now + _window_ms

	count += 1
	_request_buckets[client] = (count, reset_at)

	if count > _max_requests:
		return JSONResponse(status_code=429, content={"code": "rate_limited", "message": "Too many requests"})

	api_key = os.getenv("API_KEY")
	if api_key and request.method != "GET":
		if request.headers.get("x-api-key") != api_key:
			return JSONResponse(status_code=401, content={"code": "unauthorized", "message": "Missing or invalid API key"})

	response = await call_next(request)
	response.headers["X-Content-Type-Options"] = "nosniff"
	response.headers["X-Frame-Options"] = "DENY"
	response.headers["Referrer-Policy"] = "no-referrer"
	response.headers["X-XSS-Protection"] = "0"
	return response

app.include_router(create_router)
app.include_router(get_router)
