# K6 Performance Testing Scripts

**Comprehensive Local Performance Testing Suite for Pizza & Order API Endpoints**

Complete collection of k6 scripts covering all API endpoints with realistic workflows, comprehensive error handling, and detailed performance metrics.

---

## 📁 Scripts Overview

### Quick Reference Table

| Script                           | Duration | Users | Best For              | Status             |
| -------------------------------- | -------- | ----- | --------------------- | ------------------ |
| `health-check.js`                | 5s       | 1     | Smoke test            | ✅ Production-ready |
| `pizza-endpoints.js`             | 30s      | 5     | Pizza feature testing | ✅ Production-ready |
| `order-endpoints.js`             | 30s      | 5     | Order feature testing | ✅ Production-ready |
| `combined-load-test.js`          | 60s      | 10    | Realistic workflow    | ✅ Production-ready |
| `stress-test.js`                 | 15m      | 1-100 | Breaking point        | ✅ Production-ready |
| `advanced-workflow-test.js`      | 120s     | 15    | Complex workflows     | ✅ Enhanced         |
| `comprehensive-all-endpoints.js` | 5m       | 20    | All 11 endpoints      | ✅ New              |

---

## 🚀 Quick Start

### Installation
```bash
# Windows via Chocolatey
choco install k6

# macOS via Homebrew
brew install k6

# Linux via package manager
sudo apt-get install k6  # Debian/Ubuntu
```

### Running Tests

**Health Check (fastest)**
```bash
k6 run health-check.js
```

**Pizza Endpoints**
```bash
k6 run pizza-endpoints.js
```

**Order Endpoints**
```bash
k6 run order-endpoints.js
```

**Combined Workflow**
```bash
k6 run combined-load-test.js
```

**All Endpoints (Comprehensive)**
```bash
k6 run comprehensive-all-endpoints.js
```

---

## 📋 Detailed Script Descriptions

### 1. `health-check.js`
**Purpose:** Quick API sanity check

**Configuration:**
- Duration: ~5 seconds
- Virtual Users: 1
- Endpoints: 3

**Tests:**
- POST /api/v1/search
- GET /api/v1/order/status/{id}
- POST /api/v1/order

**When to use:**
- Before running full load tests
- CI/CD deployment verification
- Quick smoke test before meetings
- Pre-test validation

**Example:**
```bash
k6 run health-check.js
# Expected output: All checks passed ✓
```

---

### 2. `pizza-endpoints.js` (ENHANCED)
**Purpose:** Comprehensive Pizza API testing with CRUD operations

**Configuration:**
- Duration: 30 seconds
- Virtual Users: 5
- Endpoints: 7
- Test Phases: 7

**Complete Workflows:**
1. Pizza Search (multiple filter combinations)
2. List All Pizzas
3. Create Pizza
4. Get Pizza Details
5. Update Pizza (PATCH /api/v1)
6. Patch Pizza (PATCH /api/v1/{id})
7. Delete Pizza

**Endpoints Tested:**
- `POST /api/v1/search` - Search with filters
- `GET /api/v1` - List all
- `POST /api/v1` - Create
- `GET /api/v1/{id}` - Get details
- `PATCH /api/v1` - Update
- `PATCH /api/v1/{id}` - Patch update
- `DELETE /api/v1/{id}` - Delete

**Performance Thresholds:**
- Search: p(95)<400ms
- Create: p(95)<600ms
- Update: p(95)<500ms
- Get: p(95)<300ms

**Example:**
```bash
# Standard run
k6 run pizza-endpoints.js

# Increased load
k6 run --vus 20 --duration 2m pizza-endpoints.js

# Heavy load with results
k6 run --vus 50 --duration 5m --out json=results.json pizza-endpoints.js
```

---

### 3. `order-endpoints.js` (ENHANCED)
**Purpose:** Comprehensive Order API testing with full order lifecycle

**Configuration:**
- Duration: 30 seconds
- Virtual Users: 5
- Endpoints: 6
- Test Phases: 6

**Complete Workflows:**
1. Create Order
2. Get Order Status
3. Complete Order (path variant: /order/{id}/complete)
4. Complete Order (endpoint variant: /order/complete)
5. List All Orders
6. Order Summary

**Endpoints Tested:**
- `POST /api/v1/order` - Create order
- `GET /api/v1/order/status/{id}` - Get status
- `POST /api/v1/order/{id}/complete` - Complete (path)
- `POST /api/v1/order/complete` - Complete (endpoint)
- `GET /api/v1/order` - List all
- `GET /api/v1/order/summary` - Summary stats

**Performance Thresholds:**
- Create: p(95)<600ms
- Status: p(95)<300ms
- Complete: p(95)<500ms
- List: p(95)<400ms

**Example:**
```bash
# Standard run
k6 run order-endpoints.js

# Increased load
k6 run --vus 50 --duration 5m order-endpoints.js

# Stress test
k6 run --vus 100 --duration 10m --ramp-up 2m --ramp-down 2m order-endpoints.js
```

---

### 4. `combined-load-test.js`
**Purpose:** Realistic user workflow combining Pizza and Order endpoints

**Configuration:**
- Duration: 60 seconds
- Virtual Users: 10
- Realistic Think Times: Yes

**User Workflow:**
1. Search pizzas
2. Create new pizza (50% of users)
3. Create order
4. Check order status
5. Complete order

**Features:**
- Random think times between steps
- Tagged metrics per operation
- Mixed read/write operations
- Error resilience

**Example:**
```bash
# Standard load
k6 run combined-load-test.js

# Heavy load
k6 run --vus 50 --duration 5m combined-load-test.js

# Progressive ramp
k6 run --vus 100 --ramp-up 1m --duration 3m --ramp-down 1m combined-load-test.js
```

---

### 5. `stress-test.js`
**Purpose:** Find API breaking point and maximum capacity

**Configuration:**
- Duration: 15 minutes total
- Virtual Users: 1→100 progressive

**Stages:**
1. 0-1m: Ramp to 10 users
2. 1-3m: Ramp to 50 users
3. 3-8m: Ramp to 100 users
4. 8-13m: Hold at 100 users
5. 13-15m: Ramp down

**Results:**
- Shows performance degradation
- Identifies breaking point
- Maximum sustainable load

**Example:**
```bash
# Find breaking point
k6 run stress-test.js

# Save detailed results
k6 run --out json=stress-results.json stress-test.js
```

---

### 6. `advanced-workflow-test.js` (NEW)
**Purpose:** Complex realistic workflows with multiple scenarios

**Configuration:**
- Duration: 120 seconds (2 minutes)
- Virtual Users: 15
- Test Phases: 8

**Complete User Journey:**
1. **Phase 1: Pizza Discovery** - Search with multiple filters
2. **Phase 2: Inspection** - View details of 2-3 pizzas
3. **Phase 3: Creation** - Create custom pizza (30% of users)
4. **Phase 4: Order Placement** - Create order
5. **Phase 5: Status Tracking** - Check status 3 times
6. **Phase 6: Completion** - Complete order (both endpoints)
7. **Phase 7: Order Listing** - View all orders
8. **Phase 8: Verification** - Cross-check data consistency

**Special Features:**
- Cross-iteration data verification
- Multiple endpoint variants tested
- Realistic user behavior simulation
- Tagged metrics by phase
- Error handling for 404s

**Example:**
```bash
# Standard run
k6 run advanced-workflow-test.js

# Heavy load (capacity planning)
k6 run --vus 50 --duration 10m --ramp-up 2m --ramp-down 2m advanced-workflow-test.js

# Save results for analysis
k6 run --out json=advanced-results.json advanced-workflow-test.js
```

---

### 7. `comprehensive-all-endpoints.js` (NEW)
**Purpose:** Hit all 11 endpoints in sequence with comprehensive coverage

**Configuration:**
- Duration: 5 minutes
- Virtual Users: 20
- Endpoints: 11 total

**Endpoints Covered (11):**

**Pizza:**
1. POST /api/v1/search
2. GET /api/v1
3. POST /api/v1
4. GET /api/v1/{id}
5. PATCH /api/v1
6. DELETE /api/v1/{id}

**Orders:**
7. POST /api/v1/order
8. GET /api/v1/order/status/{id}
9. POST /api/v1/order/{id}/complete
10. POST /api/v1/order/complete
11. GET /api/v1/order

**Features:**
- Sequential endpoint testing
- Per-endpoint performance metrics
- Read vs Write categorization
- Comprehensive coverage

**Example:**
```bash
# Comprehensive test
k6 run comprehensive-all-endpoints.js

# Extended comprehensive
k6 run --vus 50 --duration 15m comprehensive-all-endpoints.js

# Save and analyze
k6 run --out json=comprehensive.json comprehensive-all-endpoints.js
```

---

## 🎯 Performance Targets

### Expected Response Times

**Good Performance:**
- GET /api/v1/{id}: 150-300ms
- GET /api/v1/order/status/{id}: 150-300ms
- POST /api/v1/search: 200-400ms
- POST /api/v1/order: 400-600ms
- PATCH /api/v1: 400-500ms

**Thresholds:**
- p(95) < 700ms (reads), < 800ms (writes)
- p(99) < 2000ms
- Error rate < 5%

### Test Progression

```
1. health-check.js (5s) - Verify API is up
   ↓
2. pizza-endpoints.js (30s) - Test Pizza features
   ↓
3. order-endpoints.js (30s) - Test Order features
   ↓
4. combined-load-test.js (60s) - Realistic workflow
   ↓
5. advanced-workflow-test.js (120s) - Complex scenarios
   ↓
6. comprehensive-all-endpoints.js (5m) - Complete coverage
   ↓
7. stress-test.js (15m) - Find breaking point
```

---

## ⚙️ Customization

### Command-Line Options

```bash
# Custom virtual users and duration
k6 run --vus 50 --duration 5m pizza-endpoints.js

# Ramp-up and ramp-down
k6 run --vus 100 --ramp-up 1m --duration 3m --ramp-down 1m order-endpoints.js

# Custom API port
k6 run --env BASE_URL=http://localhost:8080 pizza-endpoints.js

# Save results to JSON
k6 run --out json=results.json pizza-endpoints.js

# Combine multiple options
k6 run --vus 50 --duration 10m --out json=results.json --env BASE_URL=http://localhost:5000 combined-load-test.js
```

### Environment Variables

```bash
# Use different port
BASE_URL=http://localhost:8080 k6 run pizza-endpoints.js

# Use different environment
k6 run --env ENV=staging pizza-endpoints.js

# Multiple variables
k6 run --env BASE_URL=http://localhost:8080 --env TIMEOUT=5000 pizza-endpoints.js
```

---

## 📊 Reading Results

### Key Metrics

```
http_reqs: Total requests made
http_req_duration: Response time (milliseconds)
http_req_failed: Failed requests (errors, non-2xx)
data_received: Total data received (bytes)
data_sent: Total data sent (bytes)
```

### Interpreting Output

```
✓ checks..........................................: 98%
✓ http_req_duration..:  avg=234ms  p(95)=512ms  p(99)=892ms
✓ http_req_failed....:  0.00%
✓ http_reqs...........:  5000
  data_received.......:  125 MB
  data_sent..........:  45 MB

Summary:
- 5000 requests completed
- 98% of checks passed
- 95th percentile response: 512ms (GOOD ✓)
- Error rate: 0% (EXCELLENT ✓)
```

### Good vs Poor Performance

**GOOD (< 5% errors):**
```
p(95)=400ms, p(99)=800ms, error_rate=2%
→ Ready for production
```

**ACCEPTABLE (5-10% errors):**
```
p(95)=600ms, p(99)=1200ms, error_rate=7%
→ Monitor and optimize
```

**POOR (> 10% errors):**
```
p(95)=1500ms, p(99)=3000ms, error_rate=15%
→ Requires optimization/scaling
```

---

## 🔄 Common Workflows

### Daily Development

```bash
# Quick health check
k6 run health-check.js

# Pizza feature test
k6 run pizza-endpoints.js

# Order feature test
k6 run order-endpoints.js

# Realistic workflow (30s quick test)
k6 run --vus 5 --duration 30s combined-load-test.js
```

### Pre-Deployment

```bash
# Full validation
k6 run comprehensive-all-endpoints.js

# If results look good: Deploy ✓
# If errors > 5%: Investigate ✗
```

### Baseline Establishment

```bash
# Establish baseline with all endpoints
k6 run --out json=baseline.json comprehensive-all-endpoints.js

# Save for later comparison
# After optimization, compare: new run vs baseline
```

### Performance Tuning

```bash
# Baseline
k6 run --out json=before.json combined-load-test.js

# Make code changes...

# After optimization
k6 run --out json=after.json combined-load-test.js

# Compare metrics
# p(95) improved? ✓ Commit
# p(95) degraded? ✗ Revert
```

### Capacity Planning

```bash
# Find breaking point
k6 run stress-test.js

# Results show:
# - Errors start at 75 VUs
# - System handles ~500 req/s
# - Scale infrastructure accordingly
```

---

## 🔍 Troubleshooting

### "Connection Refused"
```bash
# API not running
# Solution: Start the API first
dotnet run

# Or check port
netstat -an | findstr :5000
```

### "x509: Certificate Error"
```bash
# Using HTTPS with self-signed cert
# Solution: Add insecure flag
k6 run --insecure order-endpoints.js
```

### "High Error Rate"
```bash
# Reduce load and retest
k6 run --vus 2 --duration 10s pizza-endpoints.js

# Check API logs for errors
# Verify database connectivity
# Check resource usage (CPU, memory)
```

### "Slow Response Times"
```bash
# May indicate system overload
# Solutions:
# 1. Add caching
# 2. Optimize database queries
# 3. Scale horizontally
# 4. Reduce other workloads
```

---

## 📚 Additional Resources

### Documentation
- `K6_PERFORMANCE_TESTING_GUIDE.md` - Comprehensive setup guide
- `K6_ENDPOINT_REFERENCE.md` - Complete endpoint documentation
- `HTTP_ORDERING_K6_SUMMARY.md` - Implementation summary

### K6 Official Resources
- [K6 Documentation](https://k6.io/docs/)
- [K6 GitHub](https://github.com/grafana/k6)
- [K6 Community Forum](https://community.k6.io/)

### Performance Best Practices
- Start small: Test with 1 VU first
- Establish baselines before optimization
- Run tests regularly (daily/weekly)
- Use realistic test data
- Monitor system resources during tests

---

## 📝 Test Coverage Summary

```
PIZZA ENDPOINTS: 6/6 ✓
  ✓ Search
  ✓ List
  ✓ Create
  ✓ Get
  ✓ Update
  ✓ Delete

ORDER ENDPOINTS: 5/5 ✓
  ✓ Create
  ✓ Get Status
  ✓ Complete (path variant)
  ✓ Complete (endpoint variant)
  ✓ List
  ✓ Summary

TOTAL: 11/11 Endpoints Tested ✓
```

---

## 🚀 Next Steps

1. **Install k6**: `choco install k6`
2. **Start API**: `dotnet run`
3. **Run health check**: `k6 run health-check.js`
4. **Review results**: Check output metrics
5. **Establish baseline**: `k6 run comprehensive-all-endpoints.js`
6. **Integrate into CI/CD**: Add to deployment pipeline
7. **Monitor regularly**: Run tests weekly/daily

---

For support and questions, see documentation files or k6 community forum.


---

### 3. `order-endpoints.js`
Tests Order API endpoints: Create, Get Status, Complete

**Best for:** Order feature testing  
**Duration:** 30 seconds  
**Users:** 5  

```bash
k6 run order-endpoints.js
```

**Endpoints tested:**
- `POST /api/v1/order` - Create order
- `GET /api/v1/order/status/{id}` - Get status
- `POST /api/v1/order/complete` - Complete order

**Customize:**
```bash
# Simulate higher load
k6 run --vus 50 --duration 5m order-endpoints.js
```

---

### 4. `combined-load-test.js`
Realistic workflow testing both Pizza and Order endpoints

**Best for:** Full system testing, realistic user simulation  
**Duration:** 60 seconds  
**Users:** 10  

```bash
k6 run combined-load-test.js
```

**User workflow:**
1. Search pizzas
2. Create new pizza (50% of users)
3. Create order
4. Check order status
5. Complete order

**Customize with ramp-up/ramp-down:**
```bash
# Gradually increase load, then decrease
k6 run --vus 100 --ramp-up 1m --duration 5m --ramp-down 1m combined-load-test.js
```

---

### 5. `stress-test.js`
Progressive load increase until API breaks

**Best for:** Finding maximum capacity, breaking points  
**Duration:** ~15 minutes  
**Users:** 1 → 10 → 50 → 100 users (with ramp stages)  

```bash
k6 run stress-test.js
```

**Stages:**
- 0-1m: Ramp up to 10 users
- 1-3m: Ramp up to 50 users
- 3-8m: Ramp up to 100 users
- 8-13m: Hold at 100 users
- 13-15m: Ramp down to 0 users

**Results tell you:**
- At what user count errors appear
- Maximum sustainable load
- Performance degradation points

---

## 🚀 Quick Start

### 1. Start Your API

```bash
cd .NET-Template/backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Api
dotnet run
# Outputs: "Now listening on: http://localhost:5000"
```

### 2. Run Health Check

```bash
cd .NET-Template/backend/.NET/Documentation/k6
k6 run health-check.js
```

**Expected output:**
```
✓ Health check: UP
✓ Order Status: Responding
✓ Order Create: UP

checks........................: 100.00%
```

### 3. Run Individual Tests

```bash
# Pizza endpoints only
k6 run pizza-endpoints.js

# Order endpoints only
k6 run order-endpoints.js

# Combined workflow
k6 run combined-load-test.js
```

### 4. Run Stress Test

```bash
# Find breaking point
k6 run stress-test.js

# Watch for when errors increase (usually at 50-100 users)
```

---

## 📊 Reading Results

### Example Output

```
√ All checks passed
     http_req_duration: avg=145.23ms min=45.12ms med=120.34ms max=2345.67ms p(90)=250ms p(95)=400ms
     http_req_failed....: 0%
     http_reqs............: 1500
     iteration_duration..: avg=5.23s   min=5.00s   max=7.45s
```

### Key Metrics

| Metric            | Meaning          | Target          |
| ----------------- | ---------------- | --------------- |
| `avg`             | Average response | < 200ms         |
| `p(95)`           | 95th percentile  | < 500ms         |
| `max`             | Maximum response | < 5000ms        |
| `http_req_failed` | Error rate       | < 5%            |
| `http_reqs`       | Total requests   | Higher = better |

---

## 🔧 Customization

### Change Virtual Users

```bash
k6 run --vus 50 pizza-endpoints.js          # 50 users instead of 5
k6 run --vus 100 order-endpoints.js         # 100 users
```

### Change Duration

```bash
k6 run --duration 1m pizza-endpoints.js     # 1 minute
k6 run --duration 5m order-endpoints.js     # 5 minutes
```

### Change API Port

```bash
# If API runs on port 8080
k6 run --env BASE_URL=http://localhost:8080 pizza-endpoints.js
```

### Save Results

```bash
# Save to JSON file
k6 run --out json=results.json pizza-endpoints.js

# View results
cat results.json | jq
```

---

## 💡 Common Scenarios

### Development Testing (Quick)

```bash
# Fast iteration during development
k6 run --vus 5 --duration 15s pizza-endpoints.js
```

### Pre-Deployment Check

```bash
# Verify system is ready before going live
k6 run health-check.js
k6 run --vus 20 --duration 1m combined-load-test.js
```

### Load Capacity Testing

```bash
# Determine max users your system can handle
k6 run stress-test.js

# Then base your deployment size on results
```

### Performance Regression Detection

```bash
# Save baseline
k6 run --out json=baseline.json pizza-endpoints.js

# After optimization
k6 run --out json=optimized.json pizza-endpoints.js

# Compare results
```

### CI/CD Integration

```bash
# Fail if errors exceed 5%
k6 run pizza-endpoints.js
# Exit code 0 if successful, 1 if thresholds exceeded
```

---

## ✅ Best Practices

### 1. Start Small
```bash
# Before: k6 run --vus 1 --duration 5s  
# After: k6 run --vus 100 --duration 5m
```

### 2. Test During Off-Peak
- Don't stress test production during business hours
- Test development/staging environments

### 3. Monitor System Resources
```bash
# Open Task Manager / System Monitor while running
# If k6 uses >30% CPU, results are unreliable
```

### 4. Establish Baselines
```bash
# Run on known-good version first
k6 run pizza-endpoints.js > baseline.txt

# Compare after changes
k6 run pizza-endpoints.js > new.txt
```

### 5. Realistic Scenarios
- Use `combined-load-test.js` for real user behavior
- Don't just hammer one endpoint
- Include think time between requests

---

## 🐛 Troubleshooting

### "Connection refused"

```bash
# Check if API is running
netstat -an | findstr :5000  # Windows
lsof -i :5000  # macOS/Linux

# Check in correct directory and port
cat appsettings.json | grep -i port
```

### "x509: certificate signed by unknown authority"

```bash
# Use HTTP (development) instead of HTTPS
# Or run with:
k6 run --insecure order-endpoints.js
```

### High Error Rates

```bash
# Reduce load and try again
k6 run --vus 2 --duration 10s pizza-endpoints.js

# Check API logs for errors
# Increase time between requests (sleep)
```

### Test takes forever

```bash
# Reduce duration
k6 run --duration 15s combined-load-test.js

# Or stop with Ctrl+C (graceful shutdown)
```

---

## 📚 More Information

- **Full Guide:** Read `K6_PERFORMANCE_TESTING_GUIDE.md`
- **k6 Docs:** https://k6.io/docs/
- **API Endpoints:** Check Controllers or Endpoints files
- **HTTP Ordering:** Endpoints have `Order` property for routing priority

---

## 🎯 Next Steps

1. ✅ Install k6 (see guide)
2. ✅ Start API
3. ✅ Run `health-check.js`
4. ✅ Run `pizza-endpoints.js`
5. ✅ Run `order-endpoints.js`
6. ✅ Run `combined-load-test.js`
7. ✅ Run `stress-test.js`
8. ✅ Analyze results
9. ✅ Integrate into CI/CD
10. ✅ Use for performance tuning

---

## 🆘 Support

Issues? Check:
1. API is running (`dotnet run`)
2. Port matches in script (`BASE_URL`)
3. API returns valid JSON
4. Check API logs for errors
5. Review K6_PERFORMANCE_TESTING_GUIDE.md

**Remember:** k6 is free, local, and has NO cloud costs!
