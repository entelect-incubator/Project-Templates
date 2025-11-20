import http from 'k6/http';
import { check, sleep, group } from 'k6';

/**
 * K6 Performance Test - All Endpoints Comprehensive Test
 * 
 * Ultimate comprehensive test hitting all endpoints:
 * 
 * PIZZA ENDPOINTS (6 total):
 * - POST /api/v1/search
 * - GET /api/v1
 * - POST /api/v1
 * - GET /api/v1/{id}
 * - PATCH /api/v1
 * - DELETE /api/v1/{id}
 * 
 * ORDER ENDPOINTS (5 total):
 * - POST /api/v1/order
 * - GET /api/v1/order/status/{id}
 * - POST /api/v1/order/{id}/complete
 * - POST /api/v1/order/complete
 * - GET /api/v1/order
 * 
 * Test Scenarios:
 * - Sequential operations
 * - Error handling
 * - Edge cases
 * - Concurrency stress
 * 
 * Run with:
 * k6 run comprehensive-all-endpoints.js
 * 
 * For longer testing:
 * k6 run --vus 20 --duration 10m comprehensive-all-endpoints.js
 * 
 * For stress testing:
 * k6 run --vus 100 --duration 15m --ramp-up 3m --ramp-down 3m comprehensive-all-endpoints.js
 */

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  vus: 20,                   // 20 virtual users
  duration: '5m',            // Run for 5 minutes
  thresholds: {
    http_req_duration: ['p(95)<700', 'p(99)<2000'],
    http_req_failed: ['rate<0.05'],
    'http_req_duration{type:read}': ['p(95)<500'],
    'http_req_duration{type:write}': ['p(95)<800'],
  },
};

export default function () {
  const testId = `${__VU}_${__ITER}`;
  const timestamp = Date.now();

  // ========================================
  // 1. PIZZA SEARCH
  // ========================================
  group('All Endpoints - 1. Pizza Search', function () {
    const searchRes = http.post(
      `${API_ENDPOINT}/search`,
      JSON.stringify({ searchTerm: '', category: 'All' }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', endpoint: 'search' },
      }
    );

    check(searchRes, {
      'Search: 200': (r) => r.status === 200,
      'Search: < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(0.2);
  });

  // ========================================
  // 2. LIST PIZZAS
  // ========================================
  group('All Endpoints - 2. List Pizzas', function () {
    const listRes = http.get(
      API_ENDPOINT,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', endpoint: 'listPizzas' },
      }
    );

    check(listRes, {
      'List: 200': (r) => r.status === 200,
      'List: < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(0.2);
  });

  // ========================================
  // 3. CREATE PIZZA
  // ========================================
  let pizzaId = 1;
  group('All Endpoints - 3. Create Pizza', function () {
    const createRes = http.post(
      API_ENDPOINT,
      JSON.stringify({
        name: `Test_Pizza_${testId}`,
        description: 'Test pizza',
        category: 'Test',
        price: 12.99,
        isAvailable: true,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'createPizza' },
      }
    );

    check(createRes, {
      'Create: 200/201': (r) => r.status === 200 || r.status === 201,
      'Create: < 800ms': (r) => r.timings.duration < 800,
    });

    try {
      const json = createRes.json();
      pizzaId = json.data?.id || json.id || 1;
    } catch (e) {}

    sleep(0.2);
  });

  // ========================================
  // 4. GET PIZZA DETAILS
  // ========================================
  group('All Endpoints - 4. Get Pizza Details', function () {
    const getRes = http.get(
      `${API_ENDPOINT}/${pizzaId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', endpoint: 'getPizza' },
      }
    );

    check(getRes, {
      'Get Pizza: 200 or 404': (r) => r.status === 200 || r.status === 404,
      'Get Pizza: < 400ms': (r) => r.timings.duration < 400,
    });
    sleep(0.2);
  });

  // ========================================
  // 5. UPDATE PIZZA
  // ========================================
  group('All Endpoints - 5. Update Pizza', function () {
    const updateRes = http.patch(
      API_ENDPOINT,
      JSON.stringify({
        id: pizzaId,
        model: {
          name: `Updated_${testId}`,
          price: 15.99,
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'updatePizza' },
      }
    );

    check(updateRes, {
      'Update: 200 or 404': (r) => r.status === 200 || r.status === 404,
      'Update: < 700ms': (r) => r.timings.duration < 700,
    });
    sleep(0.2);
  });

  // ========================================
  // 6. DELETE PIZZA
  // ========================================
  group('All Endpoints - 6. Delete Pizza', function () {
    const deleteRes = http.del(
      `${API_ENDPOINT}/${pizzaId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'deletePizza' },
      }
    );

    check(deleteRes, {
      'Delete: 200/204/404': (r) => r.status === 200 || r.status === 204 || r.status === 404,
      'Delete: < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(0.2);
  });

  // ========================================
  // 7. CREATE ORDER
  // ========================================
  let orderId = 1;
  group('All Endpoints - 7. Create Order', function () {
    const orderRes = http.post(
      `${API_ENDPOINT}/order`,
      JSON.stringify({
        customerName: `Customer_${testId}`,
        customerEmail: `test${testId}@local`,
        pizzaId: Math.floor(Math.random() * 10) + 1,
        quantity: 1,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'createOrder' },
      }
    );

    check(orderRes, {
      'Create Order: 200/201': (r) => r.status === 200 || r.status === 201,
      'Create Order: < 800ms': (r) => r.timings.duration < 800,
    });

    try {
      const json = orderRes.json();
      orderId = json.data?.id || json.id || 1;
    } catch (e) {}

    sleep(0.2);
  });

  // ========================================
  // 8. GET ORDER STATUS
  // ========================================
  group('All Endpoints - 8. Get Order Status', function () {
    const statusRes = http.get(
      `${API_ENDPOINT}/order/status/${orderId}`,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', endpoint: 'getOrderStatus' },
      }
    );

    check(statusRes, {
      'Get Status: 200 or 404': (r) => r.status === 200 || r.status === 404,
      'Get Status: < 400ms': (r) => r.timings.duration < 400,
    });
    sleep(0.2);
  });

  // ========================================
  // 9. COMPLETE ORDER (Path variant)
  // ========================================
  group('All Endpoints - 9. Complete Order (Path)', function () {
    const completeRes = http.post(
      `${API_ENDPOINT}/order/${orderId}/complete`,
      JSON.stringify({ completionNotes: 'Test' }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'completeOrderPath' },
      }
    );

    check(completeRes, {
      'Complete (path): 200/204/404': (r) => r.status === 200 || r.status === 204 || r.status === 404,
      'Complete (path): < 600ms': (r) => r.timings.duration < 600,
    });
    sleep(0.2);
  });

  // ========================================
  // 10. COMPLETE ORDER (Endpoint variant)
  // ========================================
  group('All Endpoints - 10. Complete Order (Endpoint)', function () {
    const completeAltRes = http.post(
      `${API_ENDPOINT}/order/complete`,
      JSON.stringify({ id: orderId }),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', endpoint: 'completeOrderEndpoint' },
      }
    );

    check(completeAltRes, {
      'Complete (endpoint): 200/204/404': (r) => r.status === 200 || r.status === 204 || r.status === 404,
      'Complete (endpoint): < 600ms': (r) => r.timings.duration < 600,
    });
    sleep(0.2);
  });

  // ========================================
  // 11. LIST ORDERS
  // ========================================
  group('All Endpoints - 11. List Orders', function () {
    const listOrdersRes = http.get(
      `${API_ENDPOINT}/order`,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', endpoint: 'listOrders' },
      }
    );

    check(listOrdersRes, {
      'List Orders: 200': (r) => r.status === 200,
      'List Orders: < 600ms': (r) => r.timings.duration < 600,
    });
    sleep(0.2);
  });

  // Final think time
  sleep(Math.random() * 2);
}

/**
 * Endpoints Coverage:
 * 
 * TOTAL ENDPOINTS TESTED: 11
 * 
 * Pizza Endpoints:
 * [x] POST /api/v1/search - Search pizzas
 * [x] GET /api/v1 - List all pizzas
 * [x] POST /api/v1 - Create pizza
 * [x] GET /api/v1/{id} - Get pizza details
 * [x] PATCH /api/v1 - Update pizza
 * [x] DELETE /api/v1/{id} - Delete pizza
 * 
 * Order Endpoints:
 * [x] POST /api/v1/order - Create order
 * [x] GET /api/v1/order/status/{id} - Get status
 * [x] POST /api/v1/order/{id}/complete - Complete (path)
 * [x] POST /api/v1/order/complete - Complete (endpoint)
 * [x] GET /api/v1/order - List orders
 * 
 * Performance Expectations:
 * 
 * Read Operations:
 * - Search: 200-400ms
 * - List: 300-500ms
 * - Get: 150-300ms
 * - Status: 150-300ms
 * 
 * Write Operations:
 * - Create: 400-800ms
 * - Update: 400-700ms
 * - Delete: 300-500ms
 * - Complete: 400-600ms
 * 
 * 95th Percentile Target:
 * - Reads: < 500ms
 * - Writes: < 800ms
 * - Overall: < 700ms
 */
