# eShop – Application Walkthrough

Step-by-step guide to setting up and running the full-stack eShop application locally.

---

## ✅ Prerequisites

Before you begin, ensure the following are installed on your system:

| Requirement | Version | Download |
|---|---|---|
| Node.js | v18 or higher | https://nodejs.org |
| npm | v9 or higher | Included with Node.js |
| Git | Latest | https://git-scm.com |
| MongoDB Atlas account | — | https://www.mongodb.com/atlas |

---

## 📥 Step 1 – Clone the Repository

```bash
git clone https://github.com/aliirtaza58/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

---

## 🔧 Step 2 – Configure the Backend

### 2a. Install backend dependencies
```bash
cd backend
npm install
```

### 2b. Create the environment file
Create a file named `.env` inside the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
```

> **How to get your MongoDB URI:**
> 1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
> 2. Go to your Cluster → **Connect** → **Connect your application**
> 3. Copy the connection string and replace `<username>`, `<password>`, and `<dbname>`

### 2c. Start the backend server
```bash
node server.js
```

You should see:
```
Server running on port 5000
MongoDB Connected: <your-cluster>.mongodb.net
```

---

## 🖥️ Step 3 – Setup the Frontend

Open a **new terminal window** and run:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
▲ Next.js 16.x (Turbopack)
- Local: http://localhost:3000
```

---

## 🌐 Step 4 – Open the Application

Navigate to **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧪 Step 5 – Testing the Application

### Register a User
1. Click **Register** in the top navbar
2. Fill in your name, email, and password
3. Submit — you will be logged in automatically

### Browse Products
1. Products are displayed on the home page pulled from MongoDB
2. Click any product card to navigate to its **detail page**
3. Click **Add to Cart** to add it to your cart

### Admin Panel
1. Register/login with an account marked `isAdmin: true` in MongoDB
2. Navigate to `/admin`
3. You can **Create**, **Edit**, and **Delete** products from here

### Cart & Checkout
1. Navigate to `/cart` or click the cart icon in the navbar
2. Review your items and quantities
3. Click **Checkout** to proceed

---

## 📱 Step 6 – Testing on Mobile

**Via Chrome DevTools:**
1. Press `F12` → Click the device toolbar icon (📱) or `Ctrl+Shift+M`
2. Select a device (iPhone 14, Galaxy S20, etc.)
3. Refresh the page

**Via your actual phone (same WiFi):**
1. Find your PC IP: run `ipconfig` → look for IPv4 Address
2. On your phone browser, visit: `http://<your-ip>:3000`

---

## 🛑 Stopping the Application

- **Frontend:** Press `Ctrl + C` in the frontend terminal
- **Backend:** Press `Ctrl + C` in the backend terminal

---

## ⚙️ Available Scripts

### Frontend
| Script | Command | Description |
|---|---|---|
| Dev server | `npm run dev` | Start with hot-reload |
| Build | `npm run build` | Build for production |
| Start | `npm run start` | Start production build |
| Lint | `npm run lint` | Run ESLint |

### Backend
| Script | Command | Description |
|---|---|---|
| Start | `node server.js` | Start the API server |

---

## 🐛 Common Issues

| Issue | Solution |
|---|---|
| `Cannot find module 'express'` | Run `npm install` inside `backend/` |
| `MONGO_URI is undefined` | Check your `backend/.env` file exists and has correct values |
| `Turbopack internal error` | Delete `frontend/.next` folder and re-run `npm run dev` |
| Port 3000 in use | Kill the process or change `PORT` in Next.js config |
| Port 5000 in use | Change `PORT` in `backend/.env` |
