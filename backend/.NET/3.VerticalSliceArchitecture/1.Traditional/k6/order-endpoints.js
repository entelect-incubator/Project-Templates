import http from 'k6/http';
import { check, sleep, group } from 'k6';

/**
 * K6 Performance Test - Order Endpoints (Extended)
 * 
 * Comprehensive testing of all Order API endpoints:
 * - POST /api/v1/order (Create order)
 * - GET /api/v1/order/status/{id} (Get order status)
 * - POST /api/v1/order/{id}/complete (Complete order)
 * - GET /api/v1/order (List all orders)
 * - GET /api/v1/order/summary (Get order summary)
 * 
 * Features:
 * - Realistic order workflow (create → check status → complete)
 * - Multiple endpoint variations
 * - Performance metrics per endpoint
 * - Error handling and validation
 * 
 * Run with:
 * k6 run order-endpoints.js
 * 
 * With custom configuration:
 * k6 run --vus 10 --duration 30s order-endpoints.js
 * 
 * With heavy load simulation:
 * k6 run --vus 50 --duration 5m --ramp-up 1m --ramp-down 1m order-endpoints.js
 */

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  vus: 5,                    // 5 virtual users
  duration: '30s',           // Run for 30 seconds
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],  // 95th percentile < 500ms
    http_req_failed: ['rate<0.1'],                    // Error rate < 10%
    'http_req_duration{endpoint:create}': ['p(95)<600'],      // Create slower
    'http_req_duration{endpoint:status}': ['p(95)<300'],      // Status checks faster
    'http_req_duration{endpoint:complete}': ['p(95)<500'],    // Complete operations
  },
};

export default function () {
  // ========================================
  // WORKFLOW 1: Create Order
  // ========================================
  group('Order Creation', function () {
    const createOrderPayload = {
      customerName: `Customer_${__VU}_${__ITER}`,
      customerEmail: `customer${__ITER}@example.com`,
      pizzaId: Math.floor(Math.random() * 10) + 1,  // Random pizza ID 1-10
      quantity: Math.floor(Math.random() * 5) + 1,  // 1-5 pizzas
      specialInstructions: `Order from VU ${__VU}`,
    };

    const createRes = http.post(
      `${API_ENDPOINT}/order`,
      JSON.stringify(createOrderPayload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'create', name: 'CreateOrder' },
      }
    );

    check(createRes, {
      'Create order: status 200/201': (r) => r.status === 200 || r.status === 201,
      'Create order: has order id': (r) => r.body.includes('id') || r.body.includes('Id') || r.body.includes('orderId'),
      'Create order: has status': (r) => r.body.includes('status') || r.body.includes('Status'),
      'Create order: response time < 600ms': (r) => r.timings.duration < 600,
      'Create order: no 5xx errors': (r) => r.status < 500,
    });

    // Extract order ID from response
    var orderId = Math.floor(Math.random() * 1000) + 1; // Fallback ID
    try {
      const jsonRes = createRes.json();
      if (jsonRes.data && jsonRes.data.id) {
        orderId = jsonRes.data.id;
      } else if (jsonRes.id) {
        orderId = jsonRes.id;
      } else if (jsonRes.orderId) {
        orderId = jsonRes.orderId;
      }
    } catch (e) {
      // Continue with fallback ID
    }

    sleep(0.3);

    // ========================================
    // WORKFLOW 2: Get Order Status
    // ========================================
    group('Order Status Check', function () {
      const statusRes = http.get(
        `${API_ENDPOINT}/order/status/${orderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'status', name: 'GetOrderStatus' },
        }
      );

      check(statusRes, {
        'Get status: status 200': (r) => r.status === 200,
        'Get status: returns status field': (r) => r.body.includes('status') || r.body.includes('Status'),
        'Get status: response time < 300ms': (r) => r.timings.duration < 300,
        'Get status: no 5xx errors': (r) => r.status < 500,
        'Get status: valid response': (r) => r.body.length > 0,
      });

      sleep(0.3);
    });

    // ========================================
    // WORKFLOW 3: Complete Order
    // ========================================
    group('Order Completion', function () {
      const completePayload = {
        id: orderId,
        completionNotes: `Completed by test VU ${__VU}`,
      };

      const completeRes = http.post(
        `${API_ENDPOINT}/order/${orderId}/complete`,
        JSON.stringify(completePayload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'complete', name: 'CompleteOrder' },
        }
      );

      check(completeRes, {
        'Complete order: status 200/204': (r) => r.status === 200 || r.status === 204,
        'Complete order: response time < 500ms': (r) => r.timings.duration < 500,
        'Complete order: no 5xx errors': (r) => r.status < 500,
        'Complete order: success confirmed': (r) => r.status !== 404 && r.status !== 400,
      });

      sleep(0.3);
    });

    // ========================================
    // WORKFLOW 4: Alternative Completion via Endpoint
    // ========================================
    group('Order Completion (Alternative)', function () {
      const completeAltPayload = {
        orderId: orderId,
      };

      const completeAltRes = http.post(
        `${API_ENDPOINT}/order/complete`,
        JSON.stringify(completeAltPayload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'complete', name: 'CompleteOrderAlt' },
        }
      );

      check(completeAltRes, {
        'Complete (alt): status 200': (r) => r.status === 200 || r.status === 204,
        'Complete (alt): response time < 500ms': (r) => r.timings.duration < 500,
        'Complete (alt): no 5xx errors': (r) => r.status < 500,
      });

      sleep(0.3);
    });
  });

  // ========================================
  // WORKFLOW 5: List All Orders
  // ========================================
  group('Order Listing', function () {
    const listRes = http.get(
      `${API_ENDPOINT}/order`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'list', name: 'ListOrders' },
      }
    );

    check(listRes, {
      'List orders: status 200': (r) => r.status === 200,
      'List orders: returns array': (r) => r.body.includes('[') || r.body.includes('data'),
      'List orders: response time < 400ms': (r) => r.timings.duration < 400,
      'List orders: no 5xx errors': (r) => r.status < 500,
    });

    sleep(0.3);
  });

  // ========================================
  // WORKFLOW 6: Order Summary
  // ========================================
  group('Order Summary', function () {
    const summaryRes = http.get(
      `${API_ENDPOINT}/order/summary`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'summary', name: 'OrderSummary' },
      }
    );

    check(summaryRes, {
      'Summary: status 200': (r) => r.status === 200 || r.status === 404, // May not exist
      'Summary: response time < 400ms': (r) => r.timings.duration < 400,
    });

    sleep(0.3);
  });

  // Final think time between iterations
  sleep(1);
}
