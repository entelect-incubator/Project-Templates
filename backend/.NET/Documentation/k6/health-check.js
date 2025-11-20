import http from 'k6/http';
import { check } from 'k6';

/**
 * K6 Health Check - Quick API Availability Test
 * 
 * Quick sanity check that endpoints are up and responding
 * Useful for CI/CD or pre-test validation
 * 
 * Run with:
 * k6 run health-check.js
 * 
 * Should complete in seconds if API is healthy
 */

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  vus: 1,                    // Single user
  duration: '5s',            // Quick test
  thresholds: {
    http_req_failed: ['rate==0'],  // Must have 0 errors
  },
};

export default function () {
  // Health check: Pizza endpoints
  const pizzaSearchRes = http.post(
    `${API_ENDPOINT}/search`,
    JSON.stringify({}),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(pizzaSearchRes, {
    'Pizza Search: UP': (r) => r.status === 200,
  });

  // Health check: Order endpoints
  const orderStatusRes = http.get(
    `${API_ENDPOINT}/order/status/1`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(orderStatusRes, {
    'Order Status: Responding': (r) => r.status === 200 || r.status === 404 || r.status === 400,
  });

  // Health check: Create order
  const orderRes = http.post(
    `${API_ENDPOINT}/order`,
    JSON.stringify({
      customerName: 'HealthCheck',
      customerEmail: 'health@check.com',
      pizzaId: 1,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  check(orderRes, {
    'Order Create: UP': (r) => r.status === 200,
  });
}
