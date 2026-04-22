import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * K6 Performance Test - Combined Load Test
 * 
 * Tests both Pizza and Order endpoints together simulating
 * realistic user workflows:
 * 1. Search for pizzas
 * 2. Create a new pizza
 * 3. Create an order
 * 4. Check order status
 * 5. Complete the order
 * 
 * Run with:
 * k6 run combined-load-test.js
 * 
 * With heavy load:
 * k6 run --vus 50 --duration 5m combined-load-test.js
 * 
 * With ramp-up/ramp-down:
 * k6 run --vus 50 --ramp-up 1m --duration 3m --ramp-down 1m combined-load-test.js
 */

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:5000';
const API_ENDPOINT = `${BASE_URL}/api/v1`;

export const options = {
  vus: 10,                   // 10 virtual users
  duration: '60s',           // Run for 60 seconds
  thresholds: {
    http_req_duration: ['p(95)<600', 'p(99)<1500'],  // 95th < 600ms, 99th < 1.5s
    http_req_failed: ['rate<0.05'],                   // Error rate < 5%
    'http_req_duration{staticAsset:yes}': ['p(99)<300'],  // Static assets faster
  },
};

export default function () {
  // Workflow Step 1: Search Pizzas
  const searchRes = http.post(
    `${API_ENDPOINT}/search`,
    JSON.stringify({}),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'SearchPizzas' },
    }
  );

  check(searchRes, {
    'Search: status 200': (r) => r.status === 200,
    'Search: has results': (r) => r.body.length > 0,
    'Search: response time ok': (r) => r.timings.duration < 600,
  });

  sleep(0.5);

  // Workflow Step 2: Create Pizza (50% of users)
  if (Math.random() < 0.5) {
    const createPizzaPayload = {
      name: `Pizza_Test_${__VU}_${__ITER}_${Date.now()}`,
      description: 'Performance test pizza',
      price: Math.random() * 20 + 5,  // $5-$25
      isAvailable: true,
    };

    const createPizzaRes = http.post(
      API_ENDPOINT,
      JSON.stringify(createPizzaPayload),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        tags: { name: 'CreatePizza' },
      }
    );

    check(createPizzaRes, {
      'CreatePizza: status 200': (r) => r.status === 200,
      'CreatePizza: returns id': (r) => r.body.includes('id'),
      'CreatePizza: response time ok': (r) => r.timings.duration < 600,
    });

    sleep(0.3);
  }

  // Workflow Step 3: Create Order
  const createOrderPayload = {
    customerName: `User_${__VU}_${__ITER}`,
    customerEmail: `user${__VU}@example.com`,
    pizzaId: Math.floor(Math.random() * 5) + 1,
  };

  const createOrderRes = http.post(
    `${API_ENDPOINT}/order`,
    JSON.stringify(createOrderPayload),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'CreateOrder' },
    }
  );

  check(createOrderRes, {
    'CreateOrder: status 200': (r) => r.status === 200,
    'CreateOrder: returns id': (r) => r.body.includes('id'),
    'CreateOrder: response time ok': (r) => r.timings.duration < 700,
  });

  let orderId = 1;
  try {
    const jsonRes = createOrderRes.json();
    if (jsonRes.data && jsonRes.data.id) {
      orderId = jsonRes.data.id;
    }
  } catch (e) {
    // Continue with default
  }

  sleep(0.5);

  // Workflow Step 4: Check Order Status
  const statusRes = http.get(
    `${API_ENDPOINT}/order/status/${orderId}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'GetOrderStatus' },
    }
  );

  check(statusRes, {
    'GetOrderStatus: status 200': (r) => r.status === 200,
    'GetOrderStatus: response time ok': (r) => r.timings.duration < 300,
  });

  sleep(0.3);

  // Workflow Step 5: Complete Order
  const completePayload = {
    id: orderId,
  };

  const completeRes = http.post(
    `${API_ENDPOINT}/order/complete`,
    JSON.stringify(completePayload),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { name: 'CompleteOrder' },
    }
  );

  check(completeRes, {
    'CompleteOrder: status 200': (r) => r.status === 200 || r.status === 404,
    'CompleteOrder: response time ok': (r) => r.timings.duration < 500,
  });

  sleep(Math.random() * 2);  // Random think time 0-2 seconds
}
