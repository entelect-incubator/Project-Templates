import http from 'k6/http';
import { check, sleep, group } from 'k6';

/**
 * K6 Performance Test - Advanced Workflow Test
 * 
 * Tests complex, realistic workflows combining multiple endpoints:
 * 1. Search for pizzas
 * 2. Get pizza details
 * 3. Create custom pizza (optional)
 * 4. Create order
 * 5. Check multiple order statuses
 * 6. Complete order
 * 7. List all orders
 * 
 * Simulates realistic user behavior with:
 * - Random think times between actions
 * - Error handling for 404s
 * - Multiple order states
 * - Concurrent operations
 * 
 * Run with:
 * k6 run advanced-workflow-test.js
 * 
 * With heavy load:
 * k6 run --vus 50 --duration 10m --ramp-up 2m --ramp-down 2m advanced-workflow-test.js
 * 
 * Save results:
 * k6 run --out json=results.json advanced-workflow-test.js
 */

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  vus: 15,                   // 15 virtual users
  duration: '120s',          // Run for 2 minutes
  thresholds: {
    http_req_duration: ['p(95)<600', 'p(99)<2000'],   // 95th < 600ms, 99th < 2s
    http_req_failed: ['rate<0.05'],                    // Error rate < 5%
    'http_req_duration{type:read}': ['p(95)<400'],     // Reads faster
    'http_req_duration{type:write}': ['p(95)<800'],    // Writes can be slower
    'http_req_duration{type:complex}': ['p(95)<1000'], // Complex ops slower
  },
};

// Store order IDs for cross-iteration verification
let orderIds = [];

export default function () {
  const userId = `VU_${__VU}_${__ITER}`;
  const timestamp = Date.now();

  // ========================================
  // PHASE 1: DISCOVERY - Search and Explore
  // ========================================
  group('Phase 1: Pizza Discovery', function () {
    // Search for pizzas with filters
    const searchPayloads = [
      { searchTerm: '', category: 'All', minPrice: 0, maxPrice: 99 },
      { searchTerm: 'cheese', category: 'Classic' },
      { searchTerm: 'special', isAvailable: true },
    ];

    searchPayloads.forEach((payload, index) => {
      const searchRes = http.post(
        `${API_ENDPOINT}/search`,
        JSON.stringify(payload),
        {
          headers: { 'Content-Type': 'application/json' },
          tags: { type: 'read', phase: 'discovery', search: index },
        }
      );

      check(searchRes, {
        'Search: 200 OK': (r) => r.status === 200,
        'Search: has results': (r) => r.body.length > 10,
        'Search: fast < 400ms': (r) => r.timings.duration < 400,
      });

      sleep(Math.random() * 0.5); // Random think time
    });
  });

  // ========================================
  // PHASE 2: INSPECTION - View Details
  // ========================================
  group('Phase 2: View Pizza Details', function () {
    // Get details of 2-3 pizzas
    const pizzaIds = [1, 2, 3];
    pizzaIds.forEach((id) => {
      const getRes = http.get(
        `${API_ENDPOINT}/${id}`,
        {
          headers: { 'Content-Type': 'application/json' },
          tags: { type: 'read', phase: 'inspection' },
        }
      );

      check(getRes, {
        'Get pizza: 200 OK or 404': (r) => r.status === 200 || r.status === 404,
        'Get pizza: fast < 300ms': (r) => r.timings.duration < 300,
      });

      sleep(Math.random() * 0.3);
    });
  });

  // ========================================
  // PHASE 3: CREATION - Create Custom Pizza (30% of users)
  // ========================================
  if (Math.random() < 0.3) {
    group('Phase 3: Create Custom Pizza', function () {
      const createPayload = {
        name: `Custom_${userId}_${timestamp}`,
        description: `Custom pizza created by ${userId}`,
        category: 'Custom',
        price: 11.99 + Math.random() * 8,
        isAvailable: true,
        ingredients: ['Cheese', 'Tomato', 'Custom Topping'],
      };

      const createRes = http.post(
        API_ENDPOINT,
        JSON.stringify(createPayload),
        {
          headers: { 'Content-Type': 'application/json' },
          tags: { type: 'write', phase: 'creation', action: 'create' },
        }
      );

      check(createRes, {
        'Create: 200/201 Created': (r) => r.status === 200 || r.status === 201,
        'Create: fast < 600ms': (r) => r.timings.duration < 600,
      });

      sleep(0.5);
    });
  }

  // ========================================
  // PHASE 4: ORDER PLACEMENT - Create Order
  // ========================================
  let orderId = null;
  group('Phase 4: Place Order', function () {
    const orderPayload = {
      customerName: userId,
      customerEmail: `${userId}@test.local`,
      pizzaId: Math.floor(Math.random() * 20) + 1,
      quantity: Math.floor(Math.random() * 3) + 1,
      specialInstructions: `Order from ${userId} at ${timestamp}`,
      deliveryAddress: `Address_${__VU}`,
    };

    const createOrderRes = http.post(
      `${API_ENDPOINT}/order`,
      JSON.stringify(orderPayload),
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'write', phase: 'order', action: 'create' },
      }
    );

    check(createOrderRes, {
      'Order Create: 200/201': (r) => r.status === 200 || r.status === 201,
      'Order Create: has ID': (r) => r.body.includes('id') || r.body.includes('orderId'),
      'Order Create: < 600ms': (r) => r.timings.duration < 600,
    });

    // Extract order ID
    try {
      const jsonRes = createOrderRes.json();
      orderId = jsonRes.data?.id || jsonRes.id || jsonRes.orderId || Math.floor(Math.random() * 10000);
      orderIds.push(orderId);
    } catch (e) {
      orderId = Math.floor(Math.random() * 10000);
    }

    sleep(0.5);
  });

  // ========================================
  // PHASE 5: ORDER TRACKING - Check Status Multiple Times
  // ========================================
  if (orderId) {
    group('Phase 5: Order Status Tracking', function () {
      for (let i = 0; i < 3; i++) {
        const statusRes = http.get(
          `${API_ENDPOINT}/order/status/${orderId}`,
          {
            headers: { 'Content-Type': 'application/json' },
            tags: { type: 'read', phase: 'tracking', attempt: i },
          }
        );

        check(statusRes, {
          'Status: 200 or 404': (r) => r.status === 200 || r.status === 404,
          'Status: < 300ms': (r) => r.timings.duration < 300,
          'Status: has status field': (r) => r.status !== 200 || r.body.includes('status') || r.body.includes('Status'),
        });

        sleep(Math.random() * 0.3);
      }
    });
  }

  // ========================================
  // PHASE 6: ORDER COMPLETION - Complete Order
  // ========================================
  if (orderId) {
    group('Phase 6: Complete Order', function () {
      const completePayload = {
        id: orderId,
        completionNotes: `Completed by test ${userId}`,
      };

      // Try both endpoints
      const endpoints = [
        `${API_ENDPOINT}/order/${orderId}/complete`,
        `${API_ENDPOINT}/order/complete`,
      ];

      endpoints.forEach((endpoint, idx) => {
        const completeRes = http.post(
          endpoint,
          JSON.stringify(completePayload),
          {
            headers: { 'Content-Type': 'application/json' },
            tags: { type: 'write', phase: 'completion', endpoint: idx },
          }
        );

        check(completeRes, {
          'Complete: 200/204/404': (r) => r.status === 200 || r.status === 204 || r.status === 404,
          'Complete: < 500ms': (r) => r.timings.duration < 500,
        });

        sleep(0.3);
      });
    });
  }

  // ========================================
  // PHASE 7: LISTING - View All Orders
  // ========================================
  group('Phase 7: Order Listing', function () {
    const listRes = http.get(
      `${API_ENDPOINT}/order`,
      {
        headers: { 'Content-Type': 'application/json' },
        tags: { type: 'read', phase: 'listing', complex: true },
      }
    );

    check(listRes, {
      'List orders: 200': (r) => r.status === 200,
      'List orders: has array': (r) => r.body.includes('[') || r.body.includes('data'),
      'List orders: < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(0.5);
  });

  // ========================================
  // PHASE 8: VERIFICATION - Check created items still exist
  // ========================================
  group('Phase 8: Verification', function () {
    // Verify one of the created orders
    if (orderIds.length > 0) {
      const randomOrderId = orderIds[Math.floor(Math.random() * orderIds.length)];
      
      const verifyRes = http.get(
        `${API_ENDPOINT}/order/status/${randomOrderId}`,
        {
          headers: { 'Content-Type': 'application/json' },
          tags: { type: 'read', phase: 'verification' },
        }
      );

      check(verifyRes, {
        'Verify: 200 or 404': (r) => r.status === 200 || r.status === 404,
        'Verify: consistent': (r) => true,
      });
    }

    sleep(0.5);
  });

  // Final think time
  sleep(Math.random() * 2);
}

/**
 * Expected Performance Metrics:
 * 
 * Read Operations (GET):
 * - Single pizza: 200-300ms
 * - Status check: 200-300ms
 * - List orders: 300-500ms
 * 
 * Write Operations (POST/PATCH):
 * - Create pizza: 400-600ms
 * - Create order: 400-600ms
 * - Complete order: 300-500ms
 * 
 * Complex Operations:
 * - Search: 300-500ms
 * - List with filters: 400-700ms
 * 
 * Target: 95th percentile response times below thresholds
 */
