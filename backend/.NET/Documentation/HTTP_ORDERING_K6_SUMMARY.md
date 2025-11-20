# HTTP Ordering & K6 Performance Testing Implementation Summary

**Date:** November 12, 2025  
**Status:** ✅ COMPLETE

---

## What Was Implemented

### 1. HTTP Endpoint Ordering

**Goal:** Add HTTP routing order priority to all Pizza and Order endpoints across all 5 projects

**Implementation:**

#### Minimal VSA (Endpoints API Pattern)
Added `.WithOrder(priority)` to each endpoint:
- `SearchPizzaEndpoint.cs`: Order = 100
- `CreatePizzaEndpoint.cs`: Order = 110
- `UpdatePizzaEndpoint.cs`: Order = 120
- `CreateOrderEndpoint.cs`: Order = 200
- `GetOrderStatusEndpoint.cs`: Order = 210
- `CompleteOrderEndpoint.cs`: Order = 220

#### Traditional VSA, Clean Architecture, Layered Architecture (Controller Pattern)
Added `Order = priority` attribute to each HTTP method:
- Search route: `[Route("Search", Order = 100)]`
- Create route: `[Route("", Order = 110)]`
- Update route: `[HttpPatch("{id}", Order = 120)]`
- Create order: `[HttpPost("", Order = 200)]`
- Get status: `[HttpGet("{id}/status", Order = 210)]`
- Complete order: `[HttpPost("{id}/complete", Order = 220)]`

**Files Modified (10 endpoints × 5 projects = 10 files):**

Minimal VSA:
- ✅ Api/Endpoints/V1/Pizzas/SearchPizzaEndpoint.cs
- ✅ Api/Endpoints/V1/Pizzas/CreatePizzaEndpoint.cs
- ✅ Api/Endpoints/V1/Pizzas/UpdatePizzaEndpoint.cs
- ✅ Api/Endpoints/V1/Orders/CreateOrderEndpoint.cs
- ✅ Api/Endpoints/V1/Orders/GetOrderStatusEndpoint.cs
- ✅ Api/Endpoints/V1/Orders/CompleteOrderEndpoint.cs

Traditional VSA:
- ✅ Api/Controllers/V1/PizzaController.cs
- ✅ Api/Controllers/V1/OrderController.cs

Clean Architecture:
- ✅ Api/Controllers/V1/PizzaController.cs
- ✅ Api/Controllers/V1/OrderController.cs

Layered/CleanTemplate:
- ✅ Api/Controllers/V1/PizzaController.cs
- ✅ Api/Controllers/V1/OrderController.cs

Layered/TemplateWithDataAccess:
- ✅ Api/Controllers/V1/PizzaController.cs
- ✅ Api/Controllers/V1/OrderController.cs

---

### 2. K6 Performance Testing Suite

**Goal:** Provide local, cost-free performance testing tools for developers

**Created Files:**

#### Documentation
- ✅ `K6_PERFORMANCE_TESTING_GUIDE.md` - Comprehensive 450+ line guide
  - Why k6? (vs JMeter, Locust, LoadRunner)
  - Installation (Windows, macOS, Linux, Docker)
  - Benefits & cost analysis
  - Local testing setup
  - Running tests with examples
  - Understanding metrics
  - Best practices
  - Troubleshooting guide

#### K6 Test Scripts (5 files in `k6/` folder)

1. **`health-check.js`** (Quick sanity check)
   - 1 user, 5 seconds
   - Verifies Pizza and Order endpoints are UP
   - Perfect for CI/CD pre-test validation

2. **`pizza-endpoints.js`** (Pizza feature testing)
   - 5 users, 30 seconds
   - Tests: Search → Create → Update workflow
   - Performance thresholds: p(95) < 500ms, error rate < 10%

3. **`order-endpoints.js`** (Order feature testing)
   - 5 users, 30 seconds
   - Tests: Create → Get Status → Complete workflow
   - Performance thresholds: p(95) < 500ms, error rate < 10%

4. **`combined-load-test.js`** (Realistic user simulation)
   - 10 users, 60 seconds
   - Full workflow: Search pizzas → Create pizza (50%) → Create order → Check status → Complete
   - Tags for per-endpoint metrics
   - Simulates real user behavior with think time

5. **`stress-test.js`** (Capacity testing)
   - Progressive load: 1 → 10 → 50 → 100 users over 15 minutes
   - Identifies breaking points and maximum capacity
   - Stages: Ramp up, hold, ramp down
   - Results show performance degradation curve

#### K6 README
- ✅ `k6/README.md` - Quick reference for all 5 scripts
  - Usage instructions for each script
  - Customization examples
  - Common scenarios
  - Troubleshooting
  - Integration patterns

---

## Key Features

### HTTP Ordering Benefits

✅ **Consistent Routing Priority:** Endpoints evaluated in defined order  
✅ **Performance:** More specific routes matched first  
✅ **Predictability:** Same request always hits same handler  
✅ **Debugging:** Clear route precedence for troubleshooting  

**Order Strategy:**
- Pizza endpoints: 100-120
- Order endpoints: 200-220
- Allows future expansion: 300+

### K6 Benefits

✅ **Zero Cost:** Completely free, local testing  
✅ **No Cloud:** All testing runs locally, no data sent anywhere  
✅ **No API Limits:** Run unlimited tests  
✅ **Developer Friendly:** JavaScript syntax, not XML  
✅ **CI/CD Ready:** Easy GitHub Actions integration  
✅ **HTTP/3 Support:** Tests modern protocols  
✅ **Reproducible:** Same results every time  

---

## Usage Quick Start

### HTTP Ordering
No changes needed for developers! The ordering is automatic once code compiles. ASP.NET Core handles routing priority internally.

### K6 Performance Testing

**Step 1: Install k6**
```powershell
# Windows
choco install k6

# Or download from https://github.com/grafana/k6/releases
```

**Step 2: Start API**
```bash
cd .NET-Template/backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Api
dotnet run
```

**Step 3: Run Tests**
```bash
# Health check (5 seconds)
cd k6
k6 run health-check.js

# Pizza endpoints (30 seconds)
k6 run pizza-endpoints.js

# Combined load test (60 seconds)
k6 run combined-load-test.js

# Stress test to find breaking point (15 minutes)
k6 run stress-test.js
```

**Step 4: Read Results**
```
√ Checks passed
  http_req_duration: avg=145ms p(95)=250ms p(99)=400ms
  http_req_failed: 0%
  http_reqs: 5000
  
→ Excellent performance: 5000 requests, 0 errors, avg 145ms
```

---

## Configuration

### K6 Customization

```bash
# Adjust virtual users
k6 run --vus 50 pizza-endpoints.js

# Adjust duration
k6 run --duration 5m order-endpoints.js

# Both
k6 run --vus 100 --duration 5m combined-load-test.js

# With ramp-up/ramp-down
k6 run --vus 50 --ramp-up 1m --duration 3m --ramp-down 1m combined-load-test.js

# Custom API port
k6 run --env BASE_URL=http://localhost:8080 pizza-endpoints.js

# Save results
k6 run --out json=results.json pizza-endpoints.js
```

---

## Best Practices

### For HTTP Ordering
1. ✅ Order values: 100-120 (Pizza), 200-220 (Orders)
2. ✅ Lower numbers = higher priority
3. ✅ More specific routes first (update specific before generic)
4. ✅ Future-proof: Leave gaps for new endpoints

### For K6 Testing
1. ✅ Start small: `--vus 1 --duration 5s`
2. ✅ Test locally during development
3. ✅ Establish baseline measurements
4. ✅ Run before major deployments
5. ✅ Integrate into CI/CD pipelines
6. ✅ Never use cloud/external k6 services
7. ✅ Monitor system resources during tests

---

## Integration Paths

### CI/CD Integration (GitHub Actions)

```yaml
- name: Performance Tests
  run: |
    cd .NET-Template/backend/.NET/Documentation/k6
    k6 run health-check.js
    k6 run pizza-endpoints.js
    k6 run order-endpoints.js
```

### Pre-Deployment Checklist

```bash
# 1. Verify API starts
dotnet run &

# 2. Health check
k6 run health-check.js

# 3. Quick load test
k6 run --vus 10 --duration 30s combined-load-test.js

# 4. Review results
# Error rate < 5%? ✅ Deploy
# Error rate > 5%? ❌ Investigate
```

### Development Workflow

```bash
# Before commit
k6 run pizza-endpoints.js

# After optimization
k6 run --out json=new.json combined-load-test.js

# Compare with baseline
# Performance improved? Commit
# Performance degraded? Debug
```

---

## Documentation Structure

```
.NET-Template/backend/.NET/Documentation/
├── K6_PERFORMANCE_TESTING_GUIDE.md (450+ lines)
│   └── Comprehensive guide: why, install, benefits, setup, running, results
└── k6/
    ├── README.md (Scripts overview & quick start)
    ├── health-check.js (5s sanity check)
    ├── pizza-endpoints.js (30s Pizza test)
    ├── order-endpoints.js (30s Order test)
    ├── combined-load-test.js (60s realistic workflow)
    └── stress-test.js (15m capacity test)
```

---

## Metrics & Thresholds

### Default Thresholds

All scripts enforce:
- **Error Rate:** < 10% (health-check: 0%)
- **p(95):** < 500ms
- **p(99):** < 1000ms

### Expected Results

Good Performance:
```
http_req_duration: avg=145ms p(95)=250ms
http_reqs: 5000
http_req_failed: 0%
```

Poor Performance:
```
http_req_duration: avg=2500ms p(95)=5000ms
http_reqs: 500
http_req_failed: 15%
→ Indicates API bottleneck, scale up or optimize
```

---

## Cost Analysis

### K6 Local vs Alternatives

| Tool       | Local Cost | Cloud Cost      | Setup   |
| ---------- | ---------- | --------------- | ------- |
| **k6**     | $0         | $0 (local only) | 5 min   |
| JMeter     | $0         | N/A             | 20 min  |
| Locust     | $0         | N/A             | 30 min  |
| LoadRunner | $0         | $$$$            | 1+ hour |
| k6 Cloud   | $0         | Varies          | 10 min  |

**We recommend:** Local k6 only (no cloud)

---

## Testing Scenarios

### Daily Development

```bash
# 30 seconds, quick feedback
k6 run --vus 5 --duration 30s pizza-endpoints.js
```

### Before Meetings/Demos

```bash
# Verify system is stable
k6 run health-check.js
```

### Pre-Deployment

```bash
# Full validation
k6 run combined-load-test.js
# Check results < 5% errors before deploying
```

### Capacity Planning

```bash
# Find max sustainable load
k6 run stress-test.js
# Results show breaking point
# Scale infrastructure accordingly
```

### Regression Detection

```bash
# Baseline before optimization
k6 run --out json=before.json combined-load-test.js

# After code changes
k6 run --out json=after.json combined-load-test.js

# Compare metrics to detect degradation
```

---

## Troubleshooting

### "Connection refused"
```bash
# Verify API is running
netstat -an | findstr :5000  # Windows
# Check appsettings.json for port
```

### "x509: certificate error"
```bash
# Use HTTP (development) or add flag
k6 run --insecure order-endpoints.js
```

### High error rates
```bash
# Reduce load
k6 run --vus 2 --duration 10s pizza-endpoints.js
# Check API logs for errors
```

---

## Next Steps

1. ✅ HTTP ordering implemented in all 5 projects
2. ✅ K6 documentation complete (450+ lines)
3. ✅ K6 scripts created (5 different scenarios)
4. ✅ Ready for team adoption
5. Consider: Integrate into CI/CD pipelines
6. Consider: Run performance tests on schedule
7. Consider: Track metrics over time

---

## Summary

| Component         | Status     | Files                     |
| ----------------- | ---------- | ------------------------- |
| **HTTP Ordering** | ✅ Complete | 10 endpoints updated      |
| **K6 Guide**      | ✅ Complete | 450+ lines, comprehensive |
| **K6 Scripts**    | ✅ Complete | 5 different scenarios     |
| **Documentation** | ✅ Complete | README + guide            |
| **CI/CD Ready**   | ✅ Ready    | Local only, no costs      |

**Total:** HTTP ordering on all endpoints + K6 performance testing suite with zero infrastructure costs

---

For details, see:
- `K6_PERFORMANCE_TESTING_GUIDE.md` - Complete guide
- `k6/README.md` - Quick reference
- Individual `.js` scripts - Test implementations
