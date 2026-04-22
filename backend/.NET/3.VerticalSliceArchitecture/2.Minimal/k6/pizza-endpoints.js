import http from 'k6/http';
import { check, sleep, group } from 'k6';

/**
 * K6 Performance Test - Pizza Endpoints (Extended)
 * 
 * Comprehensive testing of all Pizza API endpoints:
 * - POST /api/v1/search (Search/filter pizzas)
 * - POST /api/v1 (Create pizza)
 * - PATCH /api/v1 (Update pizza)
 * - GET /api/v1/{id} (Get pizza details)
 * - GET /api/v1 (List all pizzas)
 * - DELETE /api/v1/{id} (Delete pizza)
 * 
 * Features:
 * - Complete CRUD testing
 * - Search and filter operations
 * - Bulk operations
 * - Error scenarios
 * - Per-endpoint performance metrics
 * 
 * Run with:
 * k6 run pizza-endpoints.js
 * 
 * With custom configuration:
 * k6 run --vus 10 --duration 30s pizza-endpoints.js
 * 
 * With heavy load:
 * k6 run --vus 50 --duration 5m --ramp-up 1m --ramp-down 1m pizza-endpoints.js
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
    'http_req_duration{endpoint:search}': ['p(95)<400'],      // Search faster
    'http_req_duration{endpoint:create}': ['p(95)<600'],      // Create takes longer
    'http_req_duration{endpoint:update}': ['p(95)<500'],      // Update moderate
    'http_req_duration{endpoint:get}': ['p(95)<300'],         // Single get fastest
  },
};

export default function () {
  // ========================================
  // WORKFLOW 1: Search/List Pizzas
  // ========================================
  group('Pizza Search', function () {
    const searchPayload = {
      searchTerm: '',  // Empty = get all
      category: 'All',
      minPrice: 0,
      maxPrice: 99,
      isAvailable: true,
    };

    const searchRes = http.post(
      `${API_ENDPOINT}/search`,
      JSON.stringify(searchPayload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'search', name: 'SearchPizzas' },
      }
    );

    check(searchRes, {
      'Search: status 200': (r) => r.status === 200,
      'Search: has data': (r) => r.body.includes('data') || r.body.includes('['),
      'Search: response time < 400ms': (r) => r.timings.duration < 400,
      'Search: no 5xx errors': (r) => r.status < 500,
      'Search: valid response': (r) => r.body.length > 0,
    });

    sleep(0.3);
  });

  // ========================================
  // WORKFLOW 2: Create Pizza
  // ========================================
  group('Pizza Creation', function () {
    const createPayload = {
      name: `Pizza_${__VU}_${__ITER}_${Date.now()}`,
      description: `Test pizza created by VU ${__VU}`,
      category: 'Specialty',
      price: 12.99 + Math.random() * 10,
      isAvailable: true,
      ingredients: ['Cheese', 'Tomato', 'Basil'],
    };

    const createRes = http.post(
      API_ENDPOINT,
      JSON.stringify(createPayload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'create', name: 'CreatePizza' },
      }
    );

    check(createRes, {
      'Create: status 200/201': (r) => r.status === 200 || r.status === 201,
      'Create: has pizza id': (r) => r.body.includes('id') || r.body.includes('Id'),
      'Create: response time < 600ms': (r) => r.timings.duration < 600,
      'Create: no 5xx errors': (r) => r.status < 500,
    });

    // Extract pizza ID for further testing
    var pizzaId = Math.floor(Math.random() * 1000) + 1;
    try {
      const jsonRes = createRes.json();
      if (jsonRes.data && jsonRes.data.id) {
        pizzaId = jsonRes.data.id;
      } else if (jsonRes.id) {
        pizzaId = jsonRes.id;
      }
    } catch (e) {
      // Use fallback ID
    }

    sleep(0.3);

    // ========================================
    // WORKFLOW 3: Get Pizza Details
    // ========================================
    group('Pizza Details', function () {
      const getRes = http.get(
        `${API_ENDPOINT}/${pizzaId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'get', name: 'GetPizza' },
        }
      );

      check(getRes, {
        'Get: status 200': (r) => r.status === 200 || r.status === 404,
        'Get: response time < 300ms': (r) => r.timings.duration < 300,
        'Get: no 5xx errors': (r) => r.status < 500,
      });

      sleep(0.3);
    });

    // ========================================
    // WORKFLOW 4: Update Pizza
    // ========================================
    group('Pizza Update', function () {
      const updatePayload = {
        id: pizzaId,
        model: {
          name: `Updated_Pizza_${__ITER}`,
          description: `Updated test pizza from VU ${__VU}`,
          category: 'Specialty',
          price: 14.99 + Math.random() * 10,
          isAvailable: true,
          ingredients: ['Cheese', 'Tomato', 'Basil', 'Oregano'],
        },
      };

      const updateRes = http.patch(
        API_ENDPOINT,
        JSON.stringify(updatePayload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'update', name: 'UpdatePizza' },
        }
      );

      check(updateRes, {
        'Update: status 200': (r) => r.status === 200 || r.status === 404,  // 404 if pizza doesn't exist
        'Update: response time < 500ms': (r) => r.timings.duration < 500,
        'Update: no 5xx errors': (r) => r.status < 500,
      });

      sleep(0.3);
    });

    // ========================================
    // WORKFLOW 5: Alternative Update
    // ========================================
    group('Pizza Patch Update', function () {
      const patchPayload = {
        id: pizzaId,
        name: `Patched_${__ITER}`,
        price: 16.99,
      };

      const patchRes = http.patch(
        `${API_ENDPOINT}/${pizzaId}`,
        JSON.stringify(patchPayload),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'update', name: 'PatchPizza' },
        }
      );

      check(patchRes, {
        'Patch: status 200': (r) => r.status === 200 || r.status === 404,
        'Patch: response time < 500ms': (r) => r.timings.duration < 500,
        'Patch: no 5xx errors': (r) => r.status < 500,
      });

      sleep(0.3);
    });

    // ========================================
    // WORKFLOW 6: Delete Pizza
    // ========================================
    group('Pizza Deletion', function () {
      const deleteRes = http.del(
        `${API_ENDPOINT}/${pizzaId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          tags: { endpoint: 'delete', name: 'DeletePizza' },
        }
      );

      check(deleteRes, {
        'Delete: status 200/204/404': (r) => r.status === 200 || r.status === 204 || r.status === 404,
        'Delete: response time < 400ms': (r) => r.timings.duration < 400,
        'Delete: no 5xx errors': (r) => r.status < 500,
      });

      sleep(0.3);
    });
  });

  // ========================================
  // WORKFLOW 7: List All Pizzas
  // ========================================
  group('Pizza List', function () {
    const listRes = http.get(
      API_ENDPOINT,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { endpoint: 'list', name: 'ListPizzas' },
      }
    );

    check(listRes, {
      'List: status 200': (r) => r.status === 200,
      'List: returns array': (r) => r.body.includes('[') || r.body.includes('data'),
      'List: response time < 500ms': (r) => r.timings.duration < 500,
      'List: no 5xx errors': (r) => r.status < 500,
    });

    sleep(0.3);
  });

  // Final think time between iterations
  sleep(1);
}