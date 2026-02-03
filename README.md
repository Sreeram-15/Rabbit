# Rabbit

Rabbit is a full-stack e-commerce web app that lets customers browse and filter products, manage a cart, complete checkout, and track orders. It also includes an admin dashboard for managing products, users, and orders, plus image upload support for product media.

**Features**
- Product browsing, search, and filtering
- Product details and similar items
- Cart and checkout flow
- Order history and order details
- Admin management for users, products, and orders
- Image uploads for product media

**Tech Stack**
- Frontend: React, Vite, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT
- Media: Cloudinary
- Payments: PayPal

**Repository Structure**
- `frontend` - Client app
- `backend` - API server

**Getting Started**
1. Install dependencies
2. Configure environment variables
3. Run backend and frontend

**Install Dependencies**
```bash
npm install
cd backend
npm install
cd ../frontend
npm install
```

**Environment Variables**

Backend (`backend/.env`):
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Frontend (`frontend/.env`):
```bash
VITE_BACKEND_URL=http://localhost:3000
```

**Run Locally**
```bash
# backend
cd backend
npm run dev

# frontend (new terminal)
cd frontend
npm run dev
```

**Seeding Data**
```bash
cd backend
npm run seed
```

**Deployment (Vercel)**
Two deployments are recommended:
1. Backend as a Vercel project pointing to `backend`
2. Frontend as a Vercel project pointing to `frontend`

Set `VITE_BACKEND_URL` in the frontend project to the deployed backend URL.
