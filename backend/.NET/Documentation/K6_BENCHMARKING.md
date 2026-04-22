# k6 Benchmark Testing Guide

k6 is a modern performance testing tool for running load tests, benchmarks, and stress tests. This guide covers setup, configuration, and best practices for benchmarking your .NET backend.

## Why k6?

k6 provides several advantages:

- **JavaScript-based** - Write tests in familiar language
- **Developer-friendly** - Clear, readable test scripts
- **Fast execution** - Runs distributed load tests efficiently
- **Metrics-rich** - Detailed performance data and analysis
- **CI/CD integration** - Easy GitHub Actions and pipeline integration
- **Real user behavior** - Model realistic usage patterns

## Installation

### Global Installation

```bash
# Windows (Chocolatey)
choco install k6

# macOS (Homebrew)
brew install k6

# Linux (Ubuntu/Debian)
sudo apt-get install k6

# Docker
docker pull grafana/k6
```

### Verify Installation

```bash
k6 version
```

## Project Structure

Organize k6 tests in your project:

```
backend/
├── tests/
│   └── performance/
│       ├── k6/
│       │   ├── config/
│       │   │   ├── thresholds.js
│       │   │   └── scenarios.js
│       │   ├── scripts/
│       │   │   ├── todos.js
│       │   │   ├── users.js
│       │   │   └── smoke-test.js
│       │   └── utils/
│       │       ├── helpers.js
│       │       └── setup.js
│       └── results/
│           └── .gitkeep
```

## Configuration

### Basic Setup

Create `tests/performance/k6/config/thresholds.js`:

```javascript
// Thresholds define acceptable performance levels
// k6 will fail the test if thresholds are not met

export const thresholds = {
  // Response times: 95% of requests under 500ms
  'http_req_duration': ['p(95)<500'],
  
  // Error rate: Less than 1% failures
  'http_req_failed': ['rate<0.01'],
  
  // Connection time: Average under 100ms
  'http_connect_duration': ['avg<100'],
  
  // DNS lookup: Average under 50ms
  'http_req_looking_up_duration': ['avg<50'],
  
  // TLS handshake: Average under 200ms (if using HTTPS)
  'http_req_tls_handshaking_duration': ['avg<200'],
  
  // Request rate: At least 100 requests per second
  'http_reqs': ['rate>100'],
  
  // Group-specific thresholds
  'group_duration{group:::create-todo}': ['p(95)<1000'],
  'group_duration{group:::list-todos}': ['p(95)<500'],
};
```

### Scenarios Configuration

Create `tests/performance/k6/config/scenarios.js`:

```javascript
export const scenarios = {
  // Smoke test: Quick validation
  smoke: {
    executor: 'constant-vus',
    vus: 1,           // 1 virtual user
    duration: '30s',  // Run for 30 seconds
  },

  // Load test: Normal expected load
  load: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '30s', target: 10 },   // Ramp up to 10 users
      { duration: '2m', target: 10 },    // Stay at 10 users
      { duration: '30s', target: 0 },    // Ramp down
    ],
    gracefulRampDown: '10s',
  },

  // Stress test: Find breaking point
  stress: {
    executor: 'ramping-vus',
    startVUs: 0,
    stages: [
      { duration: '30s', target: 50 },
      { duration: '1m', target: 50 },
      { duration: '30s', target: 100 },
      { duration: '1m', target: 100 },
      { duration: '30s', target: 200 },
      { duration: '1m', target: 200 },
      { duration: '30s', target: 0 },
    ],
    gracefulRampDown: '10s',
  },

  // Soak test: Long-running stability
  soak: {
    executor: 'constant-vus',
    vus: 20,
    duration: '15m',  // 15 minutes
  },

  // Spike test: Sudden load increase
  spike: {
    executor: 'ramping-vus',
    startVUs: 10,
    stages: [
      { duration: '10s', target: 10 },
      { duration: '30s', target: 500 },  // Sudden spike
      { duration: '30s', target: 10 },
      { duration: '10s', target: 0 },
    ],
  },
};
```

### Global Configuration

Create `tests/performance/k6/config/k6-config.js`:

```javascript
export const baseConfig = {
  // API base URL (can be overridden by environment variable)
  baseUrl: __ENV.API_URL || 'http://localhost:5000/api',
  
  // Request timeout
  timeout: '30s',
  
  // Connection timeout
  connectTimeout: '10s',
  
  // Response timeout
  responseTimeout: '30s',
};

// Test data
export const testData = {
  users: [
    { email: 'user1@test.com', firstName: 'Test', lastName: 'User1' },
    { email: 'user2@test.com', firstName: 'Test', lastName: 'User2' },
    { email: 'user3@test.com', firstName: 'Test', lastName: 'User3' },
  ],
  
  todos: [
    { title: 'Complete project', description: 'Finish the feature' },
    { title: 'Review code', description: 'PR review' },
    { title: 'Deploy', description: 'Push to production' },
  ],
};
```

## Basic Test Scripts

### Helpers Utility

Create `tests/performance/k6/utils/helpers.js`:

```javascript
import { check, group } from 'k6';
import http from 'k6/http';
import { baseConfig, testData } from '../config/k6-config.js';

export function checkResponse(response, expectedStatus = 200) {
  const passed = check(response, {
    'status is expected': (r) => r.status === expectedStatus,
    'response time < 1s': (r) => r.timings.duration < 1000,
    'has content-type': (r) => r.headers['Content-Type'] !== undefined,
  });

  if (!passed) {
    console.error(`Response check failed. Status: ${response.status}, Body: ${response.body}`);
  }

  return passed;
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomEmail() {
  const timestamp = Date.now();
  return `test.${timestamp}@load-test.com`;
}

export function createHeaders(token = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export function apiCall(method, endpoint, payload = null, token = null) {
  const url = `${baseConfig.baseUrl}${endpoint}`;
  const params = { headers: createHeaders(token), timeout: baseConfig.timeout };

  let response;
  
  switch (method.toUpperCase()) {
    case 'GET':
      response = http.get(url, params);
      break;
    case 'POST':
      response = http.post(url, JSON.stringify(payload), params);
      break;
    case 'PUT':
      response = http.put(url, JSON.stringify(payload), params);
      break;
    case 'DELETE':
      response = http.del(url, params);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  return response;
}
```

### Todo API Smoke Test

Create `tests/performance/k6/scripts/smoke-test.js`:

```javascript
import { scenario } from 'k6/execution';
import { check, group, sleep } from 'k6';
import { thresholds } from '../config/thresholds.js';
import { scenarios } from '../config/scenarios.js';
import { apiCall, checkResponse } from '../utils/helpers.js';

export const options = {
  scenarios: {
    smoke: scenarios.smoke,
  },
  thresholds,
  vus: 1,
  duration: '30s',
};

export default function () {
  group('Smoke Test - Todos API', function () {
    // Create a todo
    group('Create todo', function () {
      const response = apiCall('POST', '/todos', {
        title: 'Smoke test todo',
        description: 'Testing basic functionality',
      });

      checkResponse(response, 201);
      
      if (response.status === 201) {
        const todo = response.json();
        console.log(`Created todo: ${todo.id}`);
      }
    });

    // List todos
    group('List todos', function () {
      const response = apiCall('GET', '/todos');
      checkResponse(response, 200);
      
      if (response.status === 200) {
        const todos = response.json();
        console.log(`Retrieved ${todos.length} todos`);
      }
    });

    sleep(1);
  });
}
```

### Todo Load Test

Create `tests/performance/k6/scripts/todos.js`:

```javascript
import { check, group, sleep } from 'k6';
import { thresholds } from '../config/thresholds.js';
import { scenarios } from '../config/scenarios.js';
import { apiCall, checkResponse, getRandomItem, getRandomEmail } from '../utils/helpers.js';

export const options = {
  scenarios: {
    load: scenarios.load,
  },
  thresholds,
};

const testTodos = [
  { title: 'Buy groceries', description: 'Milk, eggs, bread' },
  { title: 'Complete project', description: 'Finish feature implementation' },
  { title: 'Review code', description: 'PR review for team members' },
  { title: 'Deploy to staging', description: 'Test in staging environment' },
  { title: 'Team meeting', description: 'Weekly standup' },
];

export default function () {
  // Create a todo
  let todoId;
  group('Create todo', function () {
    const todo = getRandomItem(testTodos);
    const response = apiCall('POST', '/todos', todo);
    
    checkResponse(response, 201);
    
    if (response.status === 201) {
      todoId = response.json().id;
    }
  });

  sleep(0.5);

  // Get single todo
  if (todoId) {
    group('Get todo', function () {
      const response = apiCall('GET', `/todos/${todoId}`);
      checkResponse(response, 200);
    });

    sleep(0.5);
  }

  // List todos with pagination
  group('List todos', function () {
    const response = apiCall('GET', '/todos?page=1&pageSize=10');
    checkResponse(response, 200);
  });

  sleep(0.5);

  // Update a todo
  if (todoId) {
    group('Update todo', function () {
      const response = apiCall('PUT', `/todos/${todoId}`, {
        title: 'Updated title',
        completed: true,
      });
      
      checkResponse(response, 200);
    });

    sleep(0.5);
  }

  // Delete a todo
  if (todoId) {
    group('Delete todo', function () {
      const response = apiCall('DELETE', `/todos/${todoId}`);
      checkResponse(response, 204);
    });
  }

  sleep(1);
}
```

## Running Tests

### Run Smoke Test

```bash
k6 run tests/performance/k6/scripts/smoke-test.js
```

### Run with Custom Base URL

```bash
API_URL=http://staging-api.example.com:5000/api k6 run tests/performance/k6/scripts/todos.js
```

### Run Specific Scenario

```bash
# Stress test
k6 run --scenario stress tests/performance/k6/scripts/todos.js

# Soak test
k6 run --scenario soak tests/performance/k6/scripts/todos.js
```

### Output Results to File

```bash
# JSON format for analysis
k6 run --out json=results.json tests/performance/k6/scripts/todos.js

# Summary format
k6 run --summary-trend-stats='min,avg,med,p(95),p(99),max' tests/performance/k6/scripts/todos.js
```

## Docker Execution

Run k6 in Docker for consistent environments:

```bash
docker run --rm \
  -v $(pwd)/tests/performance/k6:/scripts \
  -e API_URL=http://host.docker.internal:5000/api \
  grafana/k6:latest run /scripts/scripts/todos.js
```

Windows (PowerShell):

```powershell
docker run --rm `
  -v ${PWD}/tests/performance/k6:/scripts `
  -e API_URL=http://host.docker.internal:5000/api `
  grafana/k6:latest run /scripts/scripts/todos.js
```

## Performance Metrics

### Key Metrics k6 Tracks

| Metric                     | Description                        | Threshold      |
| -------------------------- | ---------------------------------- | -------------- |
| `http_reqs`                | Total HTTP requests made           | -              |
| `http_req_duration`        | Time to complete HTTP request      | p(95)<500ms    |
| `http_req_blocked`         | Time spent blocked                 | avg<100ms      |
| `http_req_connecting`      | TCP connection time                | avg<100ms      |
| `http_req_tls_handshaking` | TLS handshake time                 | avg<200ms      |
| `http_req_sending`         | Time sending request               | avg<100ms      |
| `http_req_waiting`         | Time waiting for response (TTFB)   | p(95)<400ms    |
| `http_req_receiving`       | Time receiving response body       | avg<100ms      |
| `http_req_failed`          | Failed requests                    | rate<0.01 (1%) |
| `vus`                      | Virtual users currently running    | -              |
| `vus_max`                  | Maximum VUs during execution       | -              |
| `iterations`               | Number of complete test iterations | -              |
| `group_duration`           | Time spent in group                | -              |

### Interpreting Results

```
✓ http_req_duration: avg=250ms, p(95)=480ms, p(99)=650ms, max=1200ms
✓ http_req_failed: 0.5% (23 of 4568 requests)
✓ http_reqs: 1245/s (average request rate)
```

This output means:
- Average response time: 250ms
- 95% of requests under 480ms
- 0.5% of requests failed (above threshold of 1%)
- Averaging 1245 requests per second

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/performance-tests.yml`:

```yaml
name: Performance Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    # Run nightly soak test
    - cron: '0 2 * * *'

jobs:
  k6-load-test:
    runs-on: ubuntu-latest

    services:
      api:
        image: your-api:latest
        ports:
          - 5000:5000
        env:
          ASPNETCORE_ENVIRONMENT: Test
          ASPNETCORE_URLS: http://+:5000

    steps:
      - uses: actions/checkout@v4

      - name: Run smoke test
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/k6/scripts/smoke-test.js
          cloud: false
        env:
          API_URL: http://localhost:5000/api

      - name: Run load test
        uses: grafana/k6-action@v0.3.0
        with:
          filename: tests/performance/k6/scripts/todos.js
          cloud: false
        env:
          API_URL: http://localhost:5000/api

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: k6-results
          path: results.json
```

## Best Practices

### Do's

✅ Start with smoke tests before load tests
✅ Use realistic user behavior patterns
✅ Test against staging environment first
✅ Monitor backend resource usage during tests
✅ Set reasonable thresholds based on baselines
✅ Run soak tests for long-term stability
✅ Test peak hours and off-peak scenarios
✅ Document test scenarios and results
✅ Use proper VU ramp-up to avoid connection spikes
✅ Include realistic think time (sleep) between actions

### Don'ts

❌ Don't run high-load tests against production unplanned
❌ Don't ignore network latency in threshold settings
❌ Don't test without understanding infrastructure limits
❌ Don't set thresholds too strict or too loose
❌ Don't forget to clean up test data
❌ Don't run tests from single location only
❌ Don't ignore database connection pool limits
❌ Don't mix multiple unrelated scenarios in one test
❌ Don't forget to monitor system resources
❌ Don't ignore baseline performance metrics

## Troubleshooting

### All Requests Failing

**Issue:** High 5xx error rate

**Check:**
1. Is backend API running?
2. Is base URL correct? (`k6 run -e API_URL=... script.js`)
3. Check backend logs for errors
4. Verify network connectivity

### Threshold Failures

**Issue:** Test failed because p(95) response time exceeded threshold

**Solution:**
1. Review backend performance (database queries, memory usage)
2. Check network conditions
3. Adjust thresholds if needed after baseline
4. Identify slow endpoints in detailed results
5. Optimize the endpoint

### Connection Refused

**Issue:** `Error: Connection refused`

**Solution:**
```bash
# Verify backend is running
curl http://localhost:5000/health

# Check firewall
netstat -an | grep LISTEN

# If using Docker, check service:
docker ps | grep api
```

## Resources

- [k6 Official Documentation](https://k6.io/docs/)
- [k6 JavaScript API](https://k6.io/docs/javascript-api/)
- [k6 Scenarios](https://k6.io/docs/using-k6/scenarios/)
- [k6 Thresholds](https://k6.io/docs/using-k6/thresholds/)

---

**Last Updated:** November 4, 2025
**Version:** 1.0

Use this guide to benchmark and validate your API performance!
