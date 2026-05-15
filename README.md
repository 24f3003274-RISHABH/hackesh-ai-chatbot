# 🤖 Hackesh AI Chatbot

A full-stack conversational AI application built with modern web technologies. Features real-time chat interactions, persistent message storage, and a responsive React frontend with Express.js backend.

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat&logo=react)](https://react.dev)
[![Express.js](https://img.shields.io/badge/Express-5.2.1-000000?style=flat&logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.6.2-13AA52?style=flat&logo=mongodb)](https://www.mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat&logo=node.js)](https://nodejs.org)

</div>

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 💬 **Real-time Chat Interface** - Responsive chat UI built with React 19
- 🎯 **Message Persistence** - MongoDB integration for storing chat history
- 🚀 **Fast Development** - Vite for blazing-fast HMR and builds
- 📡 **RESTful API** - Express.js backend with CORS support
- 🔒 **Environment Config** - Secure configuration management with dotenv
- 📝 **Markdown Support** - Rich text rendering with react-markdown
- 🔄 **Live Reload** - Nodemon for auto-restart during development
- 🎨 **Modern UI** - Clean, responsive design with CSS modules

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.6 | UI library for building interactive components |
| **Vite** | 8.0.12 | Next-gen frontend build tool with HMR |
| **react-markdown** | 10.1.0 | Markdown parser and renderer |
| **Axios** | 1.16.1 | HTTP client for API requests |
| **ESLint** | 10.3.0 | Code quality and style enforcement |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Express.js** | 5.2.1 | Web application framework |
| **MongoDB** | 9.6.2 | Document database (via Mongoose) |
| **Mongoose** | 9.6.2 | MongoDB object modeling |
| **CORS** | 2.8.6 | Cross-Origin Resource Sharing middleware |
| **Dotenv** | 17.4.2 | Environment variable management |
| **Nodemon** | 3.1.14 | Auto-restart development server |

---

## 🏗️ Project Architecture

```
hackesh-ai-chatbot/
├── Frontend (React + Vite)          ← Port 5173
│   ├── src/
│   │   ├── App.jsx                  (Main React component)
│   │   ├── main.jsx                 (Entry point)
│   │   └── assets/                  (Static assets)
│   ├── vite.config.js               (Vite configuration)
│   └── package.json
│
└── Backend (Express + MongoDB)      ← Port 5000 (typically)
    ├── server.js                    (Express app entry)
    ├── config/
    │   └── db.js                    (MongoDB connection)
    ├── models/
    │   └── Chat.js                  (Chat message schema)
    ├── controllers/
    │   └── chatController.js        (Business logic)
    ├── routes/
    │   └── chatRoutes.js            (API routes)
    └── package.json
```

---

## 📦 Prerequisites

Ensure you have installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org))
- **npm** v9+ (comes with Node.js)
- **MongoDB** v5+ ([Local Setup](https://docs.mongodb.com/manual/installation/) or [Atlas](https://www.mongodb.com/cloud/atlas))

Verify installation:
```bash
node --version    # v18.x.x or higher
npm --version     # v9.x.x or higher
```

---

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/24f3003274-RISHABH/hackesh-ai-chatbot.git
cd hackesh-ai-chatbot
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```

### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hackesh-chatbot
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Environment Variables Breakdown:**
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment mode (development/production)
- `FRONTEND_URL` - Frontend URL for CORS configuration

### Frontend Configuration
Vite configuration is pre-configured in `vite.config.js`. Update the API endpoint in your components:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

## ▶️ Running the Application

### Option 1: Development Mode (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend:**
```bash
cd backend
npm start
```

Access the application at `http://localhost:5000`

---

## 📁 Project Structure

### Frontend (`frontend/`)
```
src/
├── App.jsx              Main React component
├── main.jsx             React DOM entry point
├── App.css              Styles for App component
├── index.css            Global styles
└── assets/              Static resources
```

### Backend (`backend/`)
```
├── server.js            Express server initialization
├── config/
│   └── db.js            MongoDB connection setup
├── models/
│   └── Chat.js          Chat message schema definition
├── controllers/
│   └── chatController.js API logic handlers
└── routes/
    └── chatRoutes.js    API route definitions
```

---

## 📡 API Endpoints

### Chat Routes

| Method | Endpoint | Description | Payload |
|--------|----------|-------------|---------|
| **GET** | `/api/chats` | Get all chat messages | - |
| **POST** | `/api/chats` | Create new chat message | `{ message: string, sender: string }` |
| **GET** | `/api/chats/:id` | Get chat by ID | - |
| **PUT** | `/api/chats/:id` | Update chat message | `{ message: string }` |
| **DELETE** | `/api/chats/:id` | Delete chat message | - |

### Example Request:
```bash
curl -X POST http://localhost:5000/api/chats \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "sender": "user"}'
```

---

## 💻 Development

### Code Quality
Run ESLint on the frontend:
```bash
cd frontend
npm run lint
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend is ready to deploy as-is
```

### Hot Module Replacement (HMR)
- **Frontend**: Vite provides instant HMR
- **Backend**: Nodemon watches for changes and auto-restarts

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push -u origin feature/amazing-feature`
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** - see the LICENSE file for details.

---

## 🔗 Quick Links

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Vite Documentation](https://vitejs.dev)

---

<div align="center">

**Built with ❤️ by Rishabh**

If you found this useful, give it a ⭐!

</div>
