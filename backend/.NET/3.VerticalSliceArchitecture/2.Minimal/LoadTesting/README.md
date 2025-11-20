# Load Testing with K6

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

### Run Tests

```bash
# Quick health check (5 seconds)
k6 run k6/health-check.js

# Pizza endpoints test (30 seconds)
k6 run k6/pizza-endpoints.js

# Order endpoints test (30 seconds) 
k6 run k6/order-endpoints.js

# All endpoints comprehensive test (5 minutes)
k6 run k6/comprehensive-all-endpoints.js

# Stress test to find breaking point (15 minutes)
k6 run k6/stress-test.js
```

## 📁 K6 Test Suite

Complete performance testing suite located in `k6/` folder:

- **health-check.js** - 5s smoke test
- **pizza-endpoints.js** - 30s Pizza CRUD operations
- **order-endpoints.js** - 30s Order lifecycle operations  
- **combined-load-test.js** - 60s realistic user workflow
- **stress-test.js** - 15m breaking point test
- **advanced-workflow-test.js** - 120s complex scenarios
- **comprehensive-all-endpoints.js** - 5m all endpoints test

## 📚 Documentation

Complete guides available:
- `K6_PERFORMANCE_TESTING_GUIDE.md` - Setup & concepts
- `K6_ENDPOINT_REFERENCE.md` - Complete endpoint documentation
- `K6_TESTING_STRATEGY.md` - Implementation strategy
- `K6_QUICK_REFERENCE.md` - Quick reference card
- `k6/README.md` - Scripts overview

## 🎯 Endpoint Coverage

**Pizza Endpoints (6/6):** Search, List, Create, Get, Update, Delete
**Order Endpoints (5/5):** Create, Status, Complete, List, Summary
**Total: 11 endpoints = 100% coverage**

## Legacy Testing

### Run Legacy Tests

k6 run Pizza/script.js

More info: https://k6.io/docs/get-started/running-k6/