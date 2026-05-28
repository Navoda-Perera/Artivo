# 🎨 Artivo — Premium Canvas Art Store

**Suggested Domain:** `artivospace.com` / `artivocanvas.com` / `canvasartivo.com`

A luxury printed canvas art e-commerce platform inspired by WallStudio.lk, built with React + Node.js + MongoDB.

## Tech Stack
- **Frontend:** React 18 + Vite + React Router
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (JSON Web Tokens)
- **Styling:** Pure CSS with CSS Variables (no TailwindCSS)

## Project Structure
```
Artivo/
├── client/   # React frontend (Vite)
├── server/   # Node.js + Express backend
└── README.md
```

## Quick Start

### 1. Install Dependencies
```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2. Configure Environment
- Copy `server/.env.example` to `server/.env`
- Fill in your MongoDB URI and JWT secret

### 3. Run Development Servers
```bash
# Terminal 1 — Backend (port 5000)
cd server && npm run dev

# Terminal 2 — Frontend (port 5173)
cd client && npm run dev
```

Open http://localhost:5173 in your browser.
