import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * K6 Stress Test - Find Breaking Point
 * 
 * Gradually increases load until the API breaks
 * Useful for finding maximum capacity
 * 
 * Run with:
 * k6 run stress-test.js
 * 
 * This will:
 * - Start with 1 user
 * - Ramp up to 100 users over 10 minutes
 * - Run at 100 users for 5 minutes
 * - Identify where errors start appearing
 */

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  stages: [
    { duration: '1m', target: 10 },      // Ramp up to 10 users over 1 min
    { duration: '2m', target: 50 },      // Ramp up to 50 users over 2 min
    { duration: '5m', target: 100 },     // Ramp up to 100 users over 5 min
    { duration: '5m', target: 100 },     // Stay at 100 users for 5 min
    { duration: '2m', target: 0 },       // Ramp down to 0 over 2 min
  ],
  thresholds: {
    // Track metrics but don't fail - we want to see the breaking point
    http_req_duration: [],
    http_req_failed: [],
  },
};

export default function () {
  // Simplified test - just hit the order endpoint
  const payload = {
    customerName: `StressTest_${__VU}_${__ITER}`,
    customerEmail: `stress${__ITER}@test.com`,
    pizzaId: Math.floor(Math.random() * 5) + 1,
  };

  const res = http.post(
    `${API_ENDPOINT}/order`,
    JSON.stringify(payload),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(res, {
    'Status 200': (r) => r.status === 200,
    'Response time': (r) => r.timings.duration,
  });

  sleep(1);
}
