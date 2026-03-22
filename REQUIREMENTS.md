# eShop – Requirements

This file lists all software requirements to run the application.

---

## System Requirements

- **OS:** Windows 10/11, macOS 12+, or Ubuntu 20.04+
- **RAM:** 4 GB minimum (8 GB recommended)
- **Disk:** 1 GB free space

---

## Runtime Requirements

| Software | Minimum Version | Install |
|---|---|---|
| Node.js | 18.x LTS | https://nodejs.org/en/download |
| npm | 9.x | Bundled with Node.js |
| Git | 2.x | https://git-scm.com/downloads |

---

## Cloud Services Required

| Service | Purpose | Sign Up |
|---|---|---|
| MongoDB Atlas | Database hosting | https://www.mongodb.com/atlas |

---

## Backend Dependencies

Located in `backend/package.json`. Install with `cd backend && npm install`.

| Package | Version | Purpose |
|---|---|---|
| express | ^4.x | HTTP server framework |
| mongoose | ^8.x | MongoDB ODM |
| bcryptjs | ^2.x | Password hashing |
| jsonwebtoken | ^9.x | JWT authentication |
| dotenv | ^16.x | Environment variable loading |
| cors | ^2.x | Cross-Origin Resource Sharing |

---

## Frontend Dependencies

Located in `frontend/package.json`. Install with `cd frontend && npm install`.

| Package | Version | Purpose |
|---|---|---|
| next | 16.x | React framework (SSR + App Router) |
| react | 19.x | UI library |
| react-dom | 19.x | DOM renderer |
| tailwindcss | 4.x | Utility-first CSS framework |
| typescript | 5.x | Type safety |
| lucide-react | latest | Icon library |

---

## Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=<your_secret_key>
```

> **Note:** The `.env` file is not committed to the repository. You must create it manually.

---

## Network Ports

| Port | Service |
|---|---|
| 3000 | Next.js frontend dev server |
| 5000 | Express.js backend API |
