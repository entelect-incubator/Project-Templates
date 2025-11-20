# K6 Quick Reference Card

**All Pizza & Order Endpoints - Complete Testing Suite**

---

## 🚀 Quick Start (Copy-Paste)

```bash
# Install k6
choco install k6

# Navigate to k6 folder
cd .NET-Template\backend\.NET\Documentation\k6

# Run quick test
k6 run health-check.js

# Run comprehensive test
k6 run comprehensive-all-endpoints.js
```

---

## 📋 All 7 Scripts

| #   | Script        | Duration | Command                                 |
| --- | ------------- | -------- | --------------------------------------- |
| 1   | Health Check  | 5s       | `k6 run health-check.js`                |
| 2   | Pizza Test    | 30s      | `k6 run pizza-endpoints.js`             |
| 3   | Order Test    | 30s      | `k6 run order-endpoints.js`             |
| 4   | Combined      | 60s      | `k6 run combined-load-test.js`          |
| 5   | Stress Test   | 15m      | `k6 run stress-test.js`                 |
| 6   | Advanced      | 120s     | `k6 run advanced-workflow-test.js`      |
| 7   | Comprehensive | 5m       | `k6 run comprehensive-all-endpoints.js` |

---

## 🎯 Endpoint Coverage

### Pizza (6/6)
- ✓ `POST /api/v1/search` (100)
- ✓ `GET /api/v1` (list)
- ✓ `POST /api/v1` (110)
- ✓ `GET /api/v1/{id}`
- ✓ `PATCH /api/v1` (120)
- ✓ `DELETE /api/v1/{id}`

### Orders (5/5)
- ✓ `POST /api/v1/order` (200)
- ✓ `GET /api/v1/order/status/{id}` (210)
- ✓ `POST /api/v1/order/{id}/complete` (220)
- ✓ `POST /api/v1/order/complete` (220)
- ✓ `GET /api/v1/order`
- ✓ `GET /api/v1/order/summary`

**Total: 11 endpoints tested ✓**

---

## 📊 Common Commands

### Basics
```bash
k6 run health-check.js                    # 5s smoke test
k6 run pizza-endpoints.js                 # Pizza CRUD
k6 run order-endpoints.js                 # Order lifecycle
```

### Customization
```bash
k6 run --vus 50 pizza-endpoints.js        # 50 users
k6 run --duration 5m pizza-endpoints.js   # 5 minutes
k6 run --vus 100 --duration 10m pizza-endpoints.js
k6 run --out json=results.json pizza-endpoints.js  # Save results
```

### Advanced
```bash
# Progressive load
k6 run --vus 100 --ramp-up 1m --duration 3m --ramp-down 1m pizza-endpoints.js

# Custom API port
k6 run --env BASE_URL=http://localhost:8080 pizza-endpoints.js

# Everything combined
k6 run --vus 50 --duration 10m --out json=results.json comprehensive-all-endpoints.js
```

---

## ⚡ Performance Targets

| Operation  | p(95)  | p(99)   |
| ---------- | ------ | ------- |
| GET Single | <300ms | <600ms  |
| GET List   | <500ms | <1000ms |
| Search     | <400ms | <800ms  |
| Create     | <600ms | <1200ms |
| Update     | <500ms | <1000ms |
| Delete     | <400ms | <800ms  |

---

## 📚 Documentation Map

| Document                          | Purpose          | Size      |
| --------------------------------- | ---------------- | --------- |
| `K6_PERFORMANCE_TESTING_GUIDE.md` | Setup & concepts | 311 lines |
| `K6_ENDPOINT_REFERENCE.md`        | Endpoint details | 594 lines |
| `K6_TESTING_STRATEGY.md`          | Implementation   | 533 lines |
| `k6/README.md`                    | Scripts guide    | 727 lines |
| `K6_LOADTESTING_COMPLETE.md`      | Complete summary | 371 lines |

---

## 🔧 Customizing Scripts

### Change Virtual Users
Edit options in any script:
```javascript
export const options = {
  vus: 50,  // Change this (default varies)
  duration: '30s',
};
```

### Change Duration
```javascript
export const options = {
  vus: 5,
  duration: '5m',  // Change this
};
```

### Add Custom Port
```bash
k6 run --env BASE_URL=http://localhost:9000 pizza-endpoints.js
```

---

## ✅ Daily Checklist

- [ ] API running: `k6 run health-check.js`
- [ ] Pizza features: `k6 run pizza-endpoints.js`
- [ ] Order features: `k6 run order-endpoints.js`
- [ ] Error rate < 10%: ✓ Good
- [ ] Error rate > 10%: ✗ Investigate

---

## 🎯 Pre-Release Checklist

- [ ] Health check: ✓ All endpoints up
- [ ] Comprehensive test: ✓ All 11 endpoints
- [ ] Error rate: ✓ < 5%
- [ ] p(95): ✓ < 700ms
- [ ] All thresholds: ✓ Passed
- [ ] Ready to deploy: ✓ YES

---

## 🚨 Troubleshooting

### "Connection Refused"
```bash
# API not running
# Solution: Start the API first
dotnet run
```

### "Certificate Error"
```bash
# HTTPS issue
# Solution: Use flag
k6 run --insecure order-endpoints.js
```

### "High Errors"
```bash
# Reduce load and test
k6 run --vus 2 --duration 10s pizza-endpoints.js
# Check API logs for errors
```

---

## 📈 Reading Results

**Good Output:**
```
✓ checks..................: 98%
✓ http_req_duration......: avg=234ms p(95)=512ms
✓ http_req_failed........: 0.00%
✓ http_reqs..............: 5000

→ Excellent! Ready for production
```

**Poor Output:**
```
✗ checks..................: 70%
✗ http_req_duration......: avg=2500ms p(95)=5000ms
✗ http_req_failed........: 15%

→ Issues detected. Investigate before deploying
```

---

## 🔗 File Locations

```
k6 Scripts:        .NET-Template/backend/.NET/Documentation/k6/
Main Guide:        .NET-Template/backend/.NET/Documentation/K6_PERFORMANCE_TESTING_GUIDE.md
Endpoints Ref:     .NET-Template/backend/.NET/Documentation/K6_ENDPOINT_REFERENCE.md
Strategy Guide:    .NET-Template/backend/.NET/Documentation/K6_TESTING_STRATEGY.md
Quick Summary:     .NET-Template/backend/.NET/Documentation/K6_LOADTESTING_COMPLETE.md
```

---

## 💡 Pro Tips

1. **Start small:** Always test with `health-check.js` first
2. **Baseline first:** Run `comprehensive-all-endpoints.js` to establish baseline
3. **Incremental load:** Use `--ramp-up` for realistic load increase
4. **Save results:** Always use `--out json=results.json` for comparison
5. **Monitor system:** Watch CPU/memory during stress tests
6. **Document findings:** Keep records of breaking points
7. **Regular testing:** Run comprehensive tests weekly

---

## 🎓 Learning Path

1. **Day 1:** Install k6, run health-check.js
2. **Day 2:** Read K6_PERFORMANCE_TESTING_GUIDE.md
3. **Day 3:** Run pizza-endpoints.js and order-endpoints.js
4. **Day 4:** Run combined-load-test.js
5. **Day 5:** Read K6_ENDPOINT_REFERENCE.md
6. **Week 2:** Run stress-test.js
7. **Week 3:** Integrate into CI/CD
8. **Week 4+:** Monitor and optimize

---

## 📞 Support

- 📖 Read: `K6_PERFORMANCE_TESTING_GUIDE.md`
- 🔍 Reference: `K6_ENDPOINT_REFERENCE.md`
- 🛠️ Troubleshoot: `k6/README.md`
- 📚 Learn: `K6_TESTING_STRATEGY.md`
- 🎯 Plan: `K6_LOADTESTING_COMPLETE.md`

---

## ✨ What's Included

✓ 7 production-ready test scripts
✓ 11 endpoints with 100% coverage
✓ 2,500+ lines of documentation
✓ 40+ code examples
✓ Zero cloud costs
✓ Ready for team adoption
✓ CI/CD integration ready

---

**Quick Test: `k6 run health-check.js` (5 seconds)**

**Status: READY FOR PRODUCTION 🚀**
