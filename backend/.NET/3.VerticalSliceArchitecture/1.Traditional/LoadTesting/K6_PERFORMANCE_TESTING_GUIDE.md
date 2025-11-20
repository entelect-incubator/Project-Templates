# K6 Performance Testing Guide for .NET Projects

**Local Performance Testing - No Cloud Costs | No External Dependencies**

---

## 📋 Table of Contents

1. [Why k6?](#why-k6)
2. [Installation](#installation)
3. [Benefits](#benefits)
4. [Local Testing Setup](#local-testing-setup)
5. [Running Tests](#running-tests)
6. [Understanding Results](#understanding-results)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Why k6?

### What is k6?

k6 is a modern load testing tool built specifically for developers. Unlike traditional tools:

- ✅ **Developer-Friendly**: Write tests in JavaScript, not XML
- ✅ **Fast**: Runs locally at scale without external services
- ✅ **Built for CI/CD**: Easy integration with pipelines
- ✅ **Cost-Free**: No cloud costs, no API limits
- ✅ **Real Insights**: HTTP/1.1, HTTP/2, HTTP/3 support
- ✅ **Simple Metrics**: Response times, throughput, error rates

### k6 vs Other Tools

| Feature        | k6         | JMeter | Locust | LoadRunner  |
| -------------- | ---------- | ------ | ------ | ----------- |
| **Cost**       | Free       | Free   | Free   | $$$$        |
| **Cloud**      | Optional   | No     | No     | Yes         |
| **Language**   | JavaScript | XML    | Python | Proprietary |
| **Ease**       | ⭐⭐⭐⭐⭐      | ⭐⭐     | ⭐⭐⭐    | ⭐⭐          |
| **Local Only** | ✓          | ✓      | ✓      | ✗           |
| **HTTP/3**     | ✓          | ✗      | ✗      | ✗           |

---

## Installation

### Windows

**Option 1: Using Chocolatey (Recommended)**

```powershell
# Install Chocolatey first (if needed)
# https://chocolatey.org/install

choco install k6
```

**Option 2: Direct Download**

```powershell
# Download from https://github.com/grafana/k6/releases
# Extract and add to PATH

# Verify installation
k6 version
```

### macOS

```bash
brew install k6
```

### Linux (Ubuntu/Debian)

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3232A
echo "deb [signed-by=/usr/share/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt-get update
sudo apt-get install k6
```

### Docker

```bash
docker run --rm -i grafana/k6 run - <script.js
```

**Verify Installation:**

```bash
k6 version
# Output: k6 v0.x.x
```

---

## Benefits

### Performance Testing Benefits

| Benefit                  | Impact                                |
| ------------------------ | ------------------------------------- |
| **Identify Bottlenecks** | Find slow endpoints before production |
| **Capacity Planning**    | Determine server load requirements    |
| **Regression Detection** | Catch performance degradation early   |
| **Spiking Behavior**     | Test response under sudden load       |
| **Endpoint Validation**  | Verify HTTP ordering and routing      |
| **Stress Testing**       | Find breaking points safely           |

### Developer Benefits

✅ **Run Locally**: No infrastructure needed  
✅ **Fast Feedback**: Get results in seconds  
✅ **Version Control**: Store test scripts in Git  
✅ **Reproducible**: Same results every time  
✅ **Integrate Easily**: Run in CI/CD pipelines  
✅ **Low Overhead**: Small footprint, minimal CPU  

### Cost Benefits

- **$0 per month** (local)
- **$0 for unlimited tests** (local)
- **$0 for data retention** (optional paid cloud: $$$)
- **No API limits** (local)
- **No bandwidth charges** (local)

---

## Local Testing Setup

### Prerequisites

- k6 installed (see Installation)
- .NET Api running on localhost (port 5000 or configured port)
- Windows PowerShell or any terminal

### Project Structure

```
.NET-Template/backend/.NET/Documentation/k6/
├── README.md (this file)
├── pizza-endpoints.js
├── order-endpoints.js
├── combined-load-test.js
├── stress-test.js
└── health-check.js
```

### Before Running Tests

1. **Start your .NET Api:**

```bash
cd .NET-Template/backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Api
dotnet run
# Server starts on https://localhost:5000 or http://localhost:5000
```

2. **Verify API is accessible:**

```bash
curl http://localhost:5000/api/v1/pizza -H "Content-Type: application/json"
```

3. **Check port configuration:**

If using custom port, update scripts:

```bash
# Find port in appsettings.json
cat appsettings.json | grep -i port
```

---

## Running Tests

### Basic Command

```bash
k6 run script.js
```

### With Custom Configuration

```bash
# Set virtual users
k6 run --vus 10 script.js

# Set duration
k6 run --duration 30s script.js

# Set both
k6 run --vus 10 --duration 30s script.js
```

### Common Options

| Option         | Example               | Purpose                     |
| -------------- | --------------------- | --------------------------- |
| `--vus`        | `--vus 50`            | Virtual users (default: 1)  |
| `--duration`   | `--duration 1m`       | Test duration (default: 0s) |
| `--iterations` | `--iterations 100`    | Total requests              |
| `--ramp-up`    | `--ramp-up 30s`       | Gradually add users         |
| `--out`        | `--out json=out.json` | Save results to file        |

### Example: Full Load Test

```bash
# Start with 10 users, ramp to 50 over 1 minute, run for 5 minutes, then ramp down
k6 run --vus 10 --ramp-up 1m --duration 5m --ramp-down 1m pizza-endpoints.js
```

---

## Understanding Results

### Key Metrics

```
k6 output:
√ Test finished successfully
     http_req_duration: avg=145.23ms min=45.12ms med=120.34ms max=2345.67ms p(90)=250.45ms p(95)=400.56ms
     http_req_failed....: 0%
     http_req_receiving.: avg=12.34ms
     http_req_sending..: avg=2.34ms
     http_req_waiting..: avg=130.55ms
     http_reqs............: 1500
```

### Metrics Explained

| Metric              | Meaning               | Good Range      |
| ------------------- | --------------------- | --------------- |
| **avg**             | Average response time | < 200ms         |
| **p(90)**           | 90th percentile       | < 500ms         |
| **p(95)**           | 95th percentile       | < 1s            |
| **max**             | Maximum response time | < 10s           |
| **http_reqs**       | Total requests        | Higher = better |
| **http_req_failed** | Error rate            | 0% (ideally)    |

### Example Interpretation

✅ **Good Results:**
```
avg=145ms p(90)=250ms http_req_failed=0% http_reqs=5000
→ Consistent performance under load
```

❌ **Poor Results:**
```
avg=2500ms p(90)=5000ms http_req_failed=15% http_reqs=500
→ Performance degradation, significant errors
```

---

## Best Practices

### 1. Start Small

```bash
# First, test with 1 user
k6 run --vus 1 --duration 10s script.js

# Then gradually increase
k6 run --vus 10 --duration 30s script.js
k6 run --vus 100 --duration 60s script.js
```

### 2. Test During Development

```bash
# Before each commit
k6 run pizza-endpoints.js
```

### 3. Establish Baselines

```bash
# Run on clean environment
k6 run --out json=baseline.json pizza-endpoints.js

# Compare after changes
k6 run --out json=new-results.json pizza-endpoints.js
```

### 4. Test Real Scenarios

Don't just test endpoints—test workflows:

```javascript
// Bad: Just hitting endpoint
http.get(url);

// Good: Realistic user flow
const createResponse = http.post(url, payload);
if (createResponse.status === 200) {
    const id = createResponse.json('id');
    http.get(`${url}/${id}`);
    http.put(`${url}/${id}`, updatedPayload);
}
```

### 5. Monitor Resource Usage

```bash
# Open System Monitor while running
k6 run --vus 100 --duration 60s script.js

# Watch CPU, Memory, Network
# If k6 itself uses >30% CPU, results may be skewed
```

---

## Best Practices (Local Only)

### Avoid Cloud/Cost Implications

❌ **Don't do:**
```javascript
// Sends data to k6 Cloud (costs money)
import { cloud } from 'k6/x/cloud';
```

✅ **Do instead:**
```javascript
// Local results only
import { check, sleep } from 'k6';
// Results saved locally with --out flag
```

### Safe for CI/CD

```yaml
# GitHub Actions example
- name: Run k6 Performance Tests
  run: |
    k6 run --vus 10 --duration 30s pizza-endpoints.js
    k6 run --vus 10 --duration 30s order-endpoints.js
```

---

## Troubleshooting

### "Connection refused"

**Problem:** `k6 run script.js` fails with connection error

**Solution:**
```bash
# 1. Check if API is running
netstat -an | findstr :5000  # Windows
lsof -i :5000  # macOS/Linux

# 2. Check firewall
# Windows Firewall might block k6

# 3. Check port in script matches appsettings.json
```

### "x509: certificate signed by unknown authority"

**Problem:** HTTPS connection fails

**Solution:**
```bash
# Use HTTP instead (local testing)
# Or disable cert verification
k6 run --insecure script.js
```

### "Too many open files"

**Problem:** Test fails with ulimit error

**Solution:**
```bash
# Increase file descriptor limit (Linux/macOS)
ulimit -n 65535

# Windows: Usually not an issue
```

### High Error Rates

**Problem:** 30%+ of requests failing

**Solution:**
```bash
# 1. Reduce VUS
k6 run --vus 5 script.js  # Instead of 100

# 2. Check API logs
# 3. Increase think time
# 4. Run during off-hours
```

---

## Next Steps

1. ✅ Install k6
2. ✅ Start your .NET Api
3. ✅ Run `pizza-endpoints.js`
4. ✅ Review results
5. ✅ Adjust and re-run
6. ✅ Integrate into CI/CD

---

## Additional Resources

- **k6 Official Docs**: https://k6.io/docs/
- **k6 Examples**: https://github.com/grafana/k6/tree/master/samples
- **HTTP/3 Testing**: https://k6.io/docs/using-k6/protocols/
- **Custom Metrics**: https://k6.io/docs/using-k6/metrics/
- **Thresholds**: https://k6.io/docs/using-k6/thresholds/

---

## Support

Issues or questions?

1. Check the scripts in `k6/` folder
2. Review k6 documentation
3. Check API logs for errors
4. Reduce VUS and try again

**Remember:** k6 is free, local, and easy to use. No cloud signup required!
