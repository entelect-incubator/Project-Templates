import http from "k6/http";
import { check, sleep } from "k6";

export const options = { vus: 2, duration: "1m" };
const BASE = __ENV.BASE_URL || "http://localhost:8000";

export default function () {
  const res = http.get(`${BASE}/pizzas/123`);
  check(res, { "status ok": (r) => r.status === 200 || r.status === 400 });
  sleep(1);
}
