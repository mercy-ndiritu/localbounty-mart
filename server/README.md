
# Marketplace API Server

This is the Express.js backend for the Marketplace application. It handles product management, image uploads, and serves as the database for the application.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the server directory:
```
cd server
```

2. Install the dependencies:
```
npm install
```
or
```
yarn install
```

### Running the Server

To start the server in development mode:
```
npm run dev
```
or
```
yarn dev
```

The server will start on http://localhost:5000 by default.

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product by ID
- `POST /api/products` - Create a new product (requires form data with productData and optional image)
- `PUT /api/products/:id` - Update a product (requires form data with productData and optional image)
- `DELETE /api/products/:id` - Delete a product

## File Upload

The server handles file uploads for product images. Uploaded files are stored in the `uploads` directory and are accessible via the `/uploads` endpoint.

## Notes

This is a development server with an in-memory database. In a production environment, you would want to use a real database like MongoDB, PostgreSQL, or MySQL.
