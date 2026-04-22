module.exports = {
  "/api": {
    target:
      process.env["services__pizzaapi__https__0"] ||
      process.env["services__pizzaapi__http__0"],
    secure: process.env["NODE_ENV"] !== "development",
    pathRewrite: {
      "^/api": "",
    },
  },
  "/v1/logs": {
    target: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"] || "http://localhost:18889",
    secure: false,
    changeOrigin: true,
  },
  "/v1/traces": {
    target: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"] || "http://localhost:18889",
    secure: false,
    changeOrigin: true,
  },
};
