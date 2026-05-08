# 🐇 Rabbit — Full-Stack E-Commerce Web App

Rabbit is a modern full-stack e-commerce platform designed to deliver a complete online shopping experience.

Built with React, Node.js, MongoDB, Tailwind CSS, PayPal, and Cloudinary.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🌟 Overview  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

Rabbit allows customers to browse products, manage carts, checkout securely, and track orders.

It also includes an admin dashboard for managing inventory, users, and order fulfillment, with full media upload support.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🚀 Why Rabbit  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

🔥 Smooth and responsive shopping experience  
🔐 Secure authentication with JWT  
☁️ Cloudinary-powered product image uploads  
💳 PayPal checkout integration  
🛠 Complete admin management system  
🎨 Modern UI built with Tailwind CSS  

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✨ Customer Experience  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

- Product browsing with search and filtering  
- Detailed product pages with recommendations  
- Cart management with real-time updates  
- Secure checkout workflow  
- PayPal payment support  
- Order history and tracking  

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🛠 Admin Dashboard  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

- Manage products, users, and orders  
- Upload and update product images  
- Inventory and fulfillment controls  
- Protected admin-only routes  

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🧰 Tech Stack  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

Frontend   → React, Vite, Redux Toolkit, Tailwind CSS  
Backend    → Node.js, Express.js  
Database   → MongoDB + Mongoose  
Auth       → JWT Tokens  
Media      → Cloudinary  
Payments   → PayPal  

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📂 Project Structure  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  

```bash
Rabbit/
│
├── frontend/    # React client application
└── backend/     # Express API + database layer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ Getting Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Clone the repository:

git clone https://github.com/your-username/rabbit.git
cd rabbit
Install dependencies:

npm install

cd backend && npm install
cd ../frontend && npm install
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 Environment Configuration
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend (backend/.env)

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Frontend (frontend/.env)

VITE_BACKEND_URL=http://localhost:3000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▶ Running Locally
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Start backend server:

cd backend
npm run dev
Start frontend client (new terminal):

cd frontend
npm run dev
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌱 Seed Demo Data (Optional)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

cd backend
npm run seed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☁️ Deployment Notes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Rabbit is best deployed as two separate Vercel projects:

Backend deployment → root directory: backend/
Frontend deployment → root directory: frontend/

Update frontend after backend deployment:

VITE_BACKEND_URL=https://your-backend-url.vercel.app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔁 Sequence Diagrams
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sequence diagrams are now maintained as separate files under `docs/sequence-diagrams/`:

- `docs/sequence-diagrams/customer-checkout.mmd`
- `docs/sequence-diagrams/guest-cart-merge.mmd`
- `docs/sequence-diagrams/admin-order-management.mmd`

These map to routes registered in `backend/server.js`.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Roadmap
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product reviews and ratings

Wishlist support

Stripe integration

Email confirmations

Real-time delivery updates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 License
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MIT License