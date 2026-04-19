# StyleSync

StyleSync is a full-stack fashion e-commerce application organized as a monorepo with three independent applications:

- `frontend` - customer-facing storefront
- `admin` - administrative dashboard
- `backend` - REST API and business logic

The project is built with React and Vite on the client side, and Express with MongoDB on the server side. It supports product discovery, cart management, checkout, order tracking, admin product management, and payment flows through Cash on Delivery, Stripe, and Razorpay.

## Table of Contents

- [Overview](#overview)
- [Repository Structure](#repository-structure)
- [Complete Project Structure](#complete-project-structure)
- [Technology Stack](#technology-stack)
- [Applications](#applications)
- [System Flow](#system-flow)
- [Backend Architecture](#backend-architecture)
- [Data Model Summary](#data-model-summary)
- [API Overview](#api-overview)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Deployment Notes](#deployment-notes)
- [Important Source Files](#important-source-files)
- [Known Implementation Notes](#known-implementation-notes)

## Overview

StyleSync is designed around a standard commerce workflow:

1. A customer browses products in the storefront.
2. An authenticated user adds products to the cart.
3. The user places an order using COD, Stripe, or Razorpay.
4. The user can review order history from the storefront.
5. An administrator manages products and order statuses from the admin panel.

The repository is split cleanly so that each application can be developed, built, and deployed independently.

## Repository Structure

```text
StyleSync/
|- frontend/  Customer storefront built with React + Vite
|- admin/     Admin dashboard built with React + Vite
|- backend/   Express API, MongoDB models, controllers, and middleware
`- README.md
```

## Complete Project Structure

```text
StyleSync/
|- README.md
|- admin/
|  |- README.md
|  |- eslint.config.js
|  |- index.html
|  |- package.json
|  |- package-lock.json
|  |- vercel.json
|  |- vite.config.js
|  `- src/
|     |- App.jsx
|     |- App.css
|     |- index.css
|     |- main.jsx
|     |- assets/
|     |  |- add_icon.png
|     |  |- assets.js
|     |  |- list_icon.png
|     |  |- order_icon.png
|     |  |- parcel_icon.svg
|     |  |- remove.png
|     |  `- upload_area.png
|     |- components/
|     |  |- Login.jsx
|     |  |- Navbar.jsx
|     |  `- Sidebar.jsx
|     `- pages/
|        |- AddProduct.jsx
|        |- ListProduct.jsx
|        `- Orders.jsx
|- backend/
|  |- app.js
|  |- constants.js
|  |- index.js
|  |- package.json
|  |- package-lock.json
|  |- vercel.json
|  |- controllers/
|  |  |- cart.controller.js
|  |  |- order.controller.js
|  |  |- product.controller.js
|  |  `- user.controller.js
|  |- db/
|  |  `- index.js
|  |- middleware/
|  |  |- auth.middleware.js
|  |  `- multer.middleware.js
|  |- models/
|  |  |- order.model.js
|  |  |- product.model.js
|  |  `- user.model.js
|  |- routes/
|  |  |- cart.route.js
|  |  |- order.route.js
|  |  |- product.route.js
|  |  `- user.routes.js
|  `- utils/
|     |- ApiError.js
|     |- ApiResponse.js
|     |- asyncHandler.js
|     `- cloudinary.js
`- frontend/
   |- README.md
   |- eslint.config.js
   |- index.html
   |- package.json
   |- package-lock.json
   |- vercel.json
   |- vite.config.js
   `- src/
      |- App.jsx
      |- index.css
      |- main.jsx
      |- assets/
      |  |- assets.js
      |  |- UI icons, payment logos, social icons
      |  `- examples: add.svg, delete_icon.svg, stripe_logo.png, razorpay_logo.png

      |- components/
      |  |- CartTotal.jsx
      |  |- Footer.jsx
      |  |- Hero.jsx
      |  |- LatestCollection.jsx
      |  |- Navbar.jsx
      |  |- NewsLetterBox.jsx
      |  |- Policy.jsx
      |  |- PriceSlider.jsx
      |  |- ProductsItem.jsx
      |  |- ProfileView.jsx
      |  |- RelatedProducts.jsx
      |  |- SearchBar.jsx
      |  |- Title.jsx
      |  `- TopSelling.jsx
      |- context/
      |  `- ShopContext.jsx
      `- pages/
         |- About.jsx
         |- Cart.jsx
         |- Collections.jsx
         |- Contact.jsx
         |- Home.jsx
         |- Login.jsx
         |- Orders.jsx
         |- PlaceOrder.jsx
         |- Product.jsx
         `- Verify.jsx
```

Notes:

- The `admin/src/assets` folder contains the small asset set used by the admin dashboard.
- The backend currently does not include automated test directories in the repository.

## Technology Stack

### Client Applications

- React 19
- React Router DOM 7
- Vite 8
- Tailwind CSS 4
- React Toastify

### Server Application

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt
- Multer
- Cloudinary
- Stripe
- Razorpay
- cookie-parser
- cors

## Applications

### Storefront: `frontend`

The storefront is the customer-facing application. It includes:

- homepage sections for hero content, latest collection, and top-selling products
- product listing and collection browsing
- client-side filtering by category, subcategory, and price range
- sorting by newest, popularity, lowest price, and highest price
- product detail pages with image gallery and size selection
- cart management
- checkout flow
- order history
- login and registration
- Stripe payment verification route

Shared storefront state is managed in `frontend/src/context/ShopContext.jsx`. This context is responsible for product loading, cart state, token state, cart synchronization, search behavior, and total calculations.

### Admin Dashboard: `admin`

The admin application is a separate React app intended for internal operations. It includes:

- admin login
- product creation
- product listing
- product removal
- order inspection
- order status updates

Primary admin routes:

- `/add`
- `/all-products`
- `/allorders`

### Backend API: `backend`

The backend provides the application API and business logic. It is responsible for:

- user registration and login
- admin authentication and authorization
- product listing and product creation/removal
- cart persistence
- order creation and retrieval
- payment initialization and verification
- file upload handling
- Cloudinary image upload

Base route groups:

```text
/api/v1/users
/api/v1/products
/api/v1/cart
/api/v1/orders
```

## System Flow

### Authentication Flow

- Users register through `POST /api/v1/users/register`.
- Users log in through `POST /api/v1/users/login`.
- Admins log in through `POST /api/v1/users/admin`.
- Protected routes use JWT verification through `verifyJWT`.
- Admin-only routes add the `isAdmin` middleware after authentication.

The current implementation promotes a user to admin when the registered email matches the configured admin email reference used by the backend.

### Product Flow

- Products are fetched publicly from `GET /api/v1/products/all-products`.
- Admins create products through `POST /api/v1/products/add`.
- Product images are uploaded through Multer and then transferred to Cloudinary.
- Product documents store image URLs and product metadata such as category, subcategory, sizes, and pricing.

### Cart Flow

- Cart state is stored on the user document in MongoDB.
- The storefront updates local cart state immediately for responsiveness.
- When a user is authenticated, cart changes are synchronized with backend endpoints.

### Order Flow

- COD orders are created directly in the database.
- Stripe orders create a checkout session and return a hosted payment URL.
- Razorpay orders are created in the backend and completed through the Razorpay checkout widget in the frontend.
- Customers can retrieve their own order history.
- Admins can retrieve all orders and update status values.

## Backend Architecture

The backend follows a conventional Express structure:

- `routes/` defines API endpoints
- `controllers/` contains request-handling logic
- `models/` defines Mongoose schemas
- `middleware/` handles authentication and file uploads
- `utils/` contains helpers such as API wrappers and Cloudinary integration
- `db/` manages the MongoDB connection

### Middleware

- `verifyJWT` validates access tokens from cookies or the `Authorization` header
- `isAdmin` restricts access to administrative actions
- `multer.middleware.js` handles temporary local file uploads for product images

### Error Handling

The backend uses:

- `ApiError` for structured error responses
- `ApiResponse` for consistent success responses
- `asyncHandler` to simplify async route handling

## Data Model Summary

### User

Key fields:

- `fullname`
- `email`
- `password`
- `role`
- `cartData`
- `refreshToken`
- timestamps

### Product

Key fields:

- `name`
- `description`
- `image`
- `price`
- `category`
- `subCategory`
- `sizes`
- `topSelling`
- timestamps

### Order

Key fields:

- `userId`
- `items`
- `amount`
- `address`
- `status`
- `paymentMethod`
- `payment`
- timestamps

## API Overview

### User Routes

- `POST /api/v1/users/register` - register a customer account
- `POST /api/v1/users/login` - authenticate a customer
- `POST /api/v1/users/admin` - authenticate an admin
- `POST /api/v1/users/logout` - log out the authenticated user

### Product Routes

- `GET /api/v1/products/all-products` - fetch all products
- `POST /api/v1/products/add` - create a product, admin only
- `POST /api/v1/products/remove` - remove a product, admin only
- `POST /api/v1/products/single` - fetch a single product

### Cart Routes

- `GET /api/v1/cart/get-cart` - fetch the current user's cart
- `POST /api/v1/cart/add-to-cart` - add a product to the cart
- `POST /api/v1/cart/update-cart` - update quantity or remove a cart entry

### Order Routes

- `GET /api/v1/orders/allorders` - fetch all orders, admin only
- `POST /api/v1/orders/status` - update order status, admin only
- `POST /api/v1/orders/place` - place a Cash on Delivery order
- `POST /api/v1/orders/stripe` - create a Stripe checkout session
- `POST /api/v1/orders/razorpay` - create a Razorpay order
- `POST /api/v1/orders/verify-stripe` - verify Stripe payment result
- `POST /api/v1/orders/verify-razorpay` - verify Razorpay payment result
- `GET /api/v1/orders/user-orders` - fetch orders for the authenticated user

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- a MongoDB instance
- a Cloudinary account for image hosting
- Stripe credentials for Stripe checkout
- Razorpay credentials for Razorpay checkout

### Install Dependencies

Install dependencies separately for each application:

```powershell
cd backend
npm install

cd ..\frontend
npm install

cd ..\admin
npm install
```

### Required Upload Directory

The upload middleware writes temporary product images to `backend/public/temp`. Create that directory before using the product upload flow if it does not already exist:

```powershell
mkdir backend\public\temp
```

### Run the Backend

```powershell
cd backend
npm run dev
```

Default server port in code:

- `8000`

### Run the Storefront

```powershell
cd frontend
npm run dev
```

Default development port in code:

- `5173`

### Run the Admin Dashboard

```powershell
cd admin
npm run dev
```

Default development port in code:

- `5174`

## Configuration

### Backend Variables Referenced in Code

- `PORT`
- `NODE_ENV`
- `MONGODB_URL`
- `CORS_ORIGIN`
- `ACCESS_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRY`
- `REFRESH_TOKEN_SECRET`
- `REFRESH_TOKEN_EXPIRY`
- `ADMIN_EMAIL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

### Frontend Variables Referenced in Code

- `VITE_BACKEND_URL`
- `VITE_RAZORPAY_KEY_ID`

### Admin Variables Referenced in Code

- `VITE_BACKEND_URL`

## Deployment Notes

Each application contains its own `vercel.json` file.

### Frontend and Admin

The frontend and admin applications are single-page applications. Their Vercel rewrite configuration routes all requests to `/` so React Router can resolve client-side routes correctly.

### Backend

The backend Vercel configuration rewrites incoming requests to `index.js`.

## Important Source Files

### Frontend

- `frontend/src/main.jsx` - storefront router definition
- `frontend/src/context/ShopContext.jsx` - shared application state and API integration
- `frontend/src/pages/PlaceOrder.jsx` - checkout flow and payment initiation
- `frontend/src/pages/Verify.jsx` - Stripe verification flow
- `frontend/src/components/ProfileView.jsx` - logout and account dropdown behavior

### Admin

- `admin/src/App.jsx` - admin shell and login-gated layout
- `admin/src/pages/AddProduct.jsx` - product creation flow
- `admin/src/pages/ListProduct.jsx` - product management list
- `admin/src/pages/Orders.jsx` - order administration interface

### Backend

- `backend/index.js` - application bootstrap
- `backend/app.js` - Express app setup and middleware registration
- `backend/db/index.js` - MongoDB connection logic
- `backend/routes/` - route definitions
- `backend/controllers/` - request and business logic handlers
- `backend/models/` - Mongoose schemas
- `backend/utils/cloudinary.js` - Cloudinary upload helper


## License
MIT - feel free to use this as a starting point for your own projects.
