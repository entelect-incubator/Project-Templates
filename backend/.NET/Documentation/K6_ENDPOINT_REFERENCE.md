# K6 Endpoint Reference Guide

Complete reference for all API endpoints tested by K6 performance testing scripts.

---

## Pizza Endpoints

### Search Pizzas
**Endpoint:** `POST /api/v1/search`

**Purpose:** Search and filter pizzas by criteria

**Request Body:**
```json
{
  "searchTerm": "cheese",
  "category": "Classic",
  "minPrice": 0,
  "maxPrice": 99,
  "isAvailable": true
}
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Margherita",
      "description": "Classic Italian",
      "category": "Classic",
      "price": 12.99,
      "isAvailable": true,
      "ingredients": ["Cheese", "Tomato", "Basil"]
    }
  ],
  "count": 1,
  "success": true
}
```

**Performance Thresholds:**
- p(95): < 400ms
- p(99): < 800ms
- Error rate: < 5%

**Test Scripts Using This:**
- `pizza-endpoints.js`
- `combined-load-test.js`
- `advanced-workflow-test.js`

---

### Get All Pizzas
**Endpoint:** `GET /api/v1`

**Purpose:** List all available pizzas

**Query Parameters:**
- `page`: Page number (optional)
- `pageSize`: Items per page (optional)
- `sortBy`: Sort field (optional)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Margherita",
      "price": 12.99,
      "isAvailable": true
    }
  ],
  "totalCount": 50,
  "pageNumber": 1,
  "pageSize": 20
}
```

**Performance Thresholds:**
- p(95): < 500ms
- p(99): < 1000ms

**Test Scripts Using This:**
- `pizza-endpoints.js`

---

### Get Pizza by ID
**Endpoint:** `GET /api/v1/{id}`

**Purpose:** Get details of a specific pizza

**Path Parameters:**
- `id`: Pizza ID (e.g., 1, 42, etc.)

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "Margherita",
    "description": "Classic Italian pizza",
    "category": "Classic",
    "price": 12.99,
    "isAvailable": true,
    "ingredients": ["Cheese", "Tomato", "Basil"],
    "createdDate": "2025-01-01T00:00:00Z"
  },
  "success": true
}
```

**Response (404 Not Found):**
Pizza with ID not found

**Performance Thresholds:**
- p(95): < 300ms
- p(99): < 600ms

**Test Scripts Using This:**
- `pizza-endpoints.js`
- `advanced-workflow-test.js`

---

### Create Pizza
**Endpoint:** `POST /api/v1`

**Purpose:** Create a new pizza

**Request Body:**
```json
{
  "name": "New Pizza",
  "description": "Description here",
  "category": "Specialty",
  "price": 14.99,
  "isAvailable": true,
  "ingredients": ["Cheese", "Tomato", "Basil"]
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 51,
    "name": "New Pizza",
    "description": "Description here",
    "category": "Specialty",
    "price": 14.99,
    "isAvailable": true,
    "ingredients": ["Cheese", "Tomato", "Basil"]
  },
  "success": true,
  "message": "Pizza created successfully"
}
```

**Validation Rules:**
- `name`: Required, min 3 chars
- `price`: Required, > 0
- `category`: Required
- `ingredients`: Optional array

**Performance Thresholds:**
- p(95): < 600ms
- p(99): < 1200ms
- Error rate: < 5%

**Test Scripts Using This:**
- `pizza-endpoints.js`
- `combined-load-test.js`
- `advanced-workflow-test.js`

---

### Update Pizza
**Endpoint:** `PATCH /api/v1`

**Purpose:** Update existing pizza

**Request Body:**
```json
{
  "id": 1,
  "model": {
    "name": "Updated Pizza",
    "description": "Updated description",
    "price": 15.99,
    "isAvailable": true
  }
}
```

**Alternative Format:**
```json
{
  "id": 1,
  "name": "Updated Pizza",
  "description": "Updated description",
  "price": 15.99,
  "isAvailable": true
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 1,
    "name": "Updated Pizza",
    "description": "Updated description",
    "price": 15.99,
    "isAvailable": true
  },
  "success": true,
  "message": "Pizza updated successfully"
}
```

**Response (404 Not Found):**
Pizza with ID not found

**Performance Thresholds:**
- p(95): < 500ms
- p(99): < 1000ms

**Test Scripts Using This:**
- `pizza-endpoints.js`

---

### Update Pizza by ID
**Endpoint:** `PATCH /api/v1/{id}`

**Purpose:** Update pizza using URL parameter

**Path Parameters:**
- `id`: Pizza ID to update

**Request Body:**
```json
{
  "name": "Updated Pizza",
  "price": 16.99
}
```

**Response (200 OK):**
Updated pizza object

**Response (404 Not Found):**
Pizza not found

**Performance Thresholds:**
- p(95): < 500ms

**Test Scripts Using This:**
- `pizza-endpoints.js`
- `advanced-workflow-test.js`

---

### Delete Pizza
**Endpoint:** `DELETE /api/v1/{id}`

**Purpose:** Delete a pizza

**Path Parameters:**
- `id`: Pizza ID to delete

**Response (204 No Content):**
Pizza deleted successfully (empty response body)

**Response (404 Not Found):**
Pizza not found

**Performance Thresholds:**
- p(95): < 400ms
- p(99): < 800ms

**Test Scripts Using This:**
- `pizza-endpoints.js`

---

## Order Endpoints

### Create Order
**Endpoint:** `POST /api/v1/order`

**Purpose:** Create a new order

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "pizzaId": 1,
  "quantity": 2,
  "specialInstructions": "Extra cheese please",
  "deliveryAddress": "123 Main St, City, ZIP"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 101,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "pizzaId": 1,
    "quantity": 2,
    "status": "Pending",
    "specialInstructions": "Extra cheese please",
    "createdDate": "2025-01-01T12:00:00Z"
  },
  "success": true,
  "message": "Order created successfully"
}
```

**Validation Rules:**
- `customerName`: Required, min 2 chars
- `customerEmail`: Required, valid email format
- `pizzaId`: Required, > 0
- `quantity`: Required, >= 1

**Performance Thresholds:**
- p(95): < 600ms
- p(99): < 1200ms
- Error rate: < 5%

**Test Scripts Using This:**
- `order-endpoints.js`
- `combined-load-test.js`
- `advanced-workflow-test.js`

---

### Get Order Status
**Endpoint:** `GET /api/v1/order/status/{id}`

**Purpose:** Check status of specific order

**Path Parameters:**
- `id`: Order ID (e.g., 101)

**Response (200 OK):**
```json
{
  "data": {
    "id": 101,
    "customerName": "John Doe",
    "status": "Pending",
    "statusDetails": "Order received, preparing",
    "lastUpdated": "2025-01-01T12:05:00Z",
    "estimatedDelivery": "2025-01-01T13:00:00Z"
  },
  "success": true
}
```

**Response (404 Not Found):**
Order not found

**Possible Status Values:**
- `Pending`: Order received
- `Processing`: Being prepared
- `Ready`: Ready for pickup/delivery
- `Delivered`: Delivered to customer
- `Completed`: Order complete
- `Cancelled`: Order cancelled

**Performance Thresholds:**
- p(95): < 300ms
- p(99): < 600ms

**Test Scripts Using This:**
- `order-endpoints.js`
- `combined-load-test.js`
- `health-check.js`
- `advanced-workflow-test.js`

---

### Complete Order (Path Variant)
**Endpoint:** `POST /api/v1/order/{id}/complete`

**Purpose:** Mark order as complete

**Path Parameters:**
- `id`: Order ID

**Request Body:**
```json
{
  "completionNotes": "Order completed successfully",
  "deliveredDate": "2025-01-01T13:00:00Z"
}
```

**Response (200 OK):**
```json
{
  "data": {
    "id": 101,
    "status": "Completed",
    "completedDate": "2025-01-01T13:00:00Z",
    "completionNotes": "Order completed successfully"
  },
  "success": true,
  "message": "Order marked as complete"
}
```

**Response (404 Not Found):**
Order not found or already completed

**Performance Thresholds:**
- p(95): < 500ms
- p(99): < 1000ms

**Test Scripts Using This:**
- `order-endpoints.js`
- `advanced-workflow-test.js`

---

### Complete Order (Endpoint Variant)
**Endpoint:** `POST /api/v1/order/complete`

**Purpose:** Alternative endpoint to complete order

**Request Body:**
```json
{
  "id": 101,
  "orderId": 101,
  "completionNotes": "Order completed"
}
```

**Response (200 OK):**
Same as path variant

**Response (404 Not Found):**
Order not found

**Performance Thresholds:**
- p(95): < 500ms

**Test Scripts Using This:**
- `order-endpoints.js`

---

### List All Orders
**Endpoint:** `GET /api/v1/order`

**Purpose:** Get list of all orders

**Query Parameters:**
- `status`: Filter by status (optional)
- `customerName`: Filter by customer (optional)
- `page`: Page number (optional)
- `pageSize`: Items per page (optional)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 101,
      "customerName": "John Doe",
      "pizzaId": 1,
      "quantity": 2,
      "status": "Completed",
      "createdDate": "2025-01-01T12:00:00Z"
    },
    {
      "id": 102,
      "customerName": "Jane Smith",
      "pizzaId": 2,
      "quantity": 1,
      "status": "Pending",
      "createdDate": "2025-01-01T12:15:00Z"
    }
  ],
  "totalCount": 150,
  "pageNumber": 1,
  "pageSize": 20
}
```

**Performance Thresholds:**
- p(95): < 400ms
- p(99): < 800ms

**Test Scripts Using This:**
- `order-endpoints.js`
- `advanced-workflow-test.js`

---

### Order Summary (Optional)
**Endpoint:** `GET /api/v1/order/summary`

**Purpose:** Get statistics about orders

**Response (200 OK):**
```json
{
  "data": {
    "totalOrders": 500,
    "completedOrders": 450,
    "pendingOrders": 40,
    "cancelledOrders": 10,
    "averageOrderValue": 28.50,
    "topPizza": {
      "id": 1,
      "name": "Margherita",
      "orderCount": 150
    }
  },
  "success": true
}
```

**Response (404 Not Found):**
Endpoint may not be implemented

**Performance Thresholds:**
- p(95): < 400ms

**Test Scripts Using This:**
- `order-endpoints.js`

---

## Health Check Endpoints

### Health Check / Status
**Endpoint:** `GET /health` or `GET /api/v1/health`

**Purpose:** Verify API is running

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "1.0.0"
}
```

**Performance Thresholds:**
- p(95): < 100ms
- Should respond in < 50ms

**Test Scripts Using This:**
- `health-check.js`

---

## Performance Testing Patterns

### Quick Health Check (5 seconds)
```bash
k6 run health-check.js
```

**Endpoints tested:**
- POST /api/v1/search
- GET /api/v1/order/status/{id}
- POST /api/v1/order

---

### Pizza Feature Testing (30 seconds)
```bash
k6 run pizza-endpoints.js
```

**Workflow:**
1. Search pizzas
2. Create pizza
3. Get pizza details
4. Update pizza
5. List all pizzas
6. Delete pizza

---

### Order Feature Testing (30 seconds)
```bash
k6 run order-endpoints.js
```

**Workflow:**
1. Create order
2. Get order status
3. Complete order (path variant)
4. Complete order (endpoint variant)
5. List all orders
6. Get order summary

---

### Combined Load Test (60 seconds)
```bash
k6 run combined-load-test.js
```

**Realistic workflow combining all endpoints**

---

### Advanced Workflow Test (120 seconds)
```bash
k6 run advanced-workflow-test.js
```

**Complex workflow with 8 phases:**
1. Pizza discovery (search)
2. View details (GET)
3. Create custom pizza (30% of users)
4. Place order
5. Track status (multiple checks)
6. Complete order
7. List orders
8. Verification

---

## Response Time Expectations

### Good Performance (< 5% errors)
- Search: 200-400ms
- Get single: 150-300ms
- Create: 300-600ms
- Update: 300-500ms
- List: 300-500ms
- Status: 150-300ms

### Acceptable Performance (5-10% errors)
- Operations slightly slower
- Some 500-1000ms responses
- Still meets SLA

### Poor Performance (> 10% errors)
- Operations > 1000ms
- High error rates
- Need optimization

---

## Error Scenarios

### 400 Bad Request
- Invalid JSON body
- Missing required fields
- Invalid field values
- Type mismatches

### 404 Not Found
- Pizza/Order ID doesn't exist
- Endpoint not implemented
- Resource deleted

### 500 Internal Server Error
- Database connection error
- Processing error
- System failure

### 503 Service Unavailable
- API overloaded
- Database down
- Maintenance

---

## Customization Examples

### Test with Different Configurations

```bash
# Light load
k6 run --vus 5 --duration 30s pizza-endpoints.js

# Medium load
k6 run --vus 20 --duration 5m pizza-endpoints.js

# Heavy load
k6 run --vus 100 --duration 10m pizza-endpoints.js

# Stress test (ramp up)
k6 run --vus 1 --duration 15m -e RAMP_UP=true stress-test.js

# Custom API port
k6 run --env BASE_URL=http://localhost:8080 pizza-endpoints.js

# Save results
k6 run --out json=results.json pizza-endpoints.js

# Combine options
k6 run --vus 50 --duration 5m --out json=results.json pizza-endpoints.js
```

---

## Metrics Reference

### HTTP Request Metrics
- `http_reqs`: Total number of requests
- `http_req_duration`: Request duration (milliseconds)
- `http_req_blocked`: Time blocked before request
- `http_req_connecting`: Connection time
- `http_req_tls_handshaking`: TLS handshake time
- `http_req_sending`: Request send time
- `http_req_waiting`: Server processing time
- `http_req_receiving`: Response receive time
- `http_req_failed`: Failed requests

### Percentile Metrics
- `p(50)`: Median (50th percentile)
- `p(90)`: 90th percentile
- `p(95)`: 95th percentile (common target)
- `p(99)`: 99th percentile
- `p(99.9)`: 99.9th percentile

---

## Next Steps

1. **Establish Baselines:** Run tests and record baseline metrics
2. **Identify Bottlenecks:** Look for slow endpoints
3. **Optimize:** Fix performance issues
4. **Re-test:** Verify improvements
5. **Monitor:** Run tests regularly
6. **Integrate:** Add to CI/CD pipeline

---

For more details, see:
- `K6_PERFORMANCE_TESTING_GUIDE.md` - Setup and concepts
- `k6/README.md` - Quick reference
- Individual script files - Implementations
