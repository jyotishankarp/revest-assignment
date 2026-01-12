# Product & Order Management Microservices

A simple microservices system built with NestJS for managing products and orders.

## What's Inside

- **API Gateway** - Main entry point (port 3000)
- **Product Service** - Manages products (port 3001)
- **Order Service** - Manages orders (port 3002)

## Setup

1. Install dependencies for each service:
```bash
cd api-gateway
npm install

cd ../service-a
npm install

cd ../service-b
npm install
```

## Running the Application

Open 3 separate terminals and run:

**Terminal 1 - API Gateway:**
```bash
cd api-gateway
npm run start:dev
```

**Terminal 2 - Product Service:**
```bash
cd service-a
npm run start:dev
```

**Terminal 3 - Order Service:**
```bash
cd service-b
npm run start:dev
```

## Using the API

All requests go through: `http://localhost:3000`

### Create a Product

```bash
POST http://localhost:3000/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop for work",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics"
}
```

### Get All Products

```bash
GET http://localhost:3000/products
```

### Create an Order

```bash
POST http://localhost:3000/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 999.99
    }
  ]
}
```

### Get All Orders (with product details)

```bash
GET http://localhost:3000/orders
```

### Update Order Status

```bash
PUT http://localhost:3000/orders/1
Content-Type: application/json

{
  "status": "confirmed"
}
```

Available statuses: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

## Quick Test Flow

1. **Create a product** using POST /products
2. **Note the product ID** from the response
3. **Create an order** using POST /orders with that product ID
4. **View orders** using GET /orders to see order with product details

## Features

✅ Create, read, update, delete products  
✅ Create, read, update, delete orders  
✅ Orders automatically fetch product details  
✅ Input validation on all requests  
✅ Consistent error handling  
✅ Services communicate via REST API  

## Architecture

```
Client Request
     ↓
API Gateway (HTTP REST)
     ↓
Product Service ←→ Order Service
(HTTP + TCP)        (HTTP + TCP)
```

- **HTTP REST**: For client-facing APIs
- **TCP**: For internal service communication
- **REST**: Order Service calls Product Service via HTTP

## Ports

- API Gateway: `3000` (HTTP)
- Product Service: `3001` (HTTP), `3101` (TCP)
- Order Service: `3002` (HTTP), `3102` (TCP)

## Error Handling

All errors return a consistent format:

```json
{
  "statusCode": 400,
  "timestamp": "2026-01-13T01:30:00.000Z",
  "path": "/orders",
  "method": "POST",
  "message": "Validation error message",
  "error": "Bad Request"
}
```

## Validation Rules

**Products:**
- Name: 3-100 characters
- Description: minimum 10 characters
- Price: must be positive
- Stock: must be positive
- Category: minimum 2 characters

**Orders:**
- Must have at least 1 item
- Quantity: minimum 1
- Price: must be positive
- Product must exist

## Notes

- Products are stored in memory (resets on restart)
- Orders are stored in memory (resets on restart)
- Make sure all 3 services are running before testing
- Create products before creating orders
