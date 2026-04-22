import express from "express";
import { json } from "body-parser";
import { logger } from "./core/logger";
import { startOtel } from "./core/otel";
import { routes } from "./routes";
const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60000);
const maxRequests = Number(process.env.RATE_LIMIT_MAX || 100);
const requestBuckets = new Map();
startOtel();
const app = express();
app.use(json());
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-XSS-Protection", "0");
    res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
    next();
});
app.use((req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const existing = requestBuckets.get(key);
    if (!existing || existing.resetAt <= now) {
        requestBuckets.set(key, { count: 1, resetAt: now + windowMs });
        return next();
    }
    existing.count += 1;
    if (existing.count > maxRequests) {
        return res.status(429).json({ code: "rate_limited", message: "Too many requests" });
    }
    return next();
});
app.use((req, res, next) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey || req.method === "GET")
        return next();
    if (req.header("x-api-key") !== apiKey) {
        return res.status(401).json({ code: "unauthorized", message: "Missing or invalid API key" });
    }
    return next();
});
app.use(routes);
// Error middleware maps domain errors to HTTP
app.use((err, _req, res, _next) => {
    logger.error({ err }, "unhandled error");
    const code = err.code || "internal_error";
    const status = code === "validation_error" ? 400 : code === "not_found" ? 404 : 500;
    res.status(status).json({ code, message: err.message || "Internal error" });
});
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info({ port }, "api listening"));
export { app };
