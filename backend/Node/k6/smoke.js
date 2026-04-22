import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 2,
  duration: "1m",
};

const BASE = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE}/pizzas/00000000-0000-0000-0000-000000000000`);
  check(res, { "status ok": (r) => r.status === 400 || r.status === 200 });
  sleep(1);
}
