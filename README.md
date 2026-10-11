# 🧠 NeuralPad

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-ioredis-DC382D?logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css&logoColor=white)

**A modern, cloud-based web IDE and code development workspace built with React 19, Monaco Editor, and a Microservices backend architecture.**

[Features](#-features) • [Architecture](#-architecture) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Gateway](#-api-gateway-endpoints) • [Roadmap](#-roadmap)

</div>

---

## ✨ Features

- 💻 **Monaco Code Editor**: Powered by the same editor engine as VS Code, with syntax highlighting, automatic indentation, multiple languages, and dark mode.
- 📁 **Hierarchical File Explorer**: Create, rename, edit, and organize files and nested folders with an $O(N)$ linear in-memory tree builder.
- 👁️ **Sandboxed Live Preview**: Instant live preview for web applications rendered safely inside an isolated sandboxed iframe.
- 🔐 **Secure Google OAuth**: Client-side Firebase Google sign-in coupled with server-side Firebase Admin token validation.
- ⚡ **Distributed Sessions & Caching**: Redis-backed centralized session management with automatic TTL expiration and cache-aside invalidation for project listings.
- 🛡️ **API Gateway Architecture**: Single entry-point reverse proxy handling CORS, cookie validation, and identity propagation via `x-user-id` headers.

---

## 🏗️ Architecture

```
                      +---------------------------------------+
                      |       Client / Browser (React 19)     |
                      |    (Vite, Monaco Editor, Tailwind v4) |
                      +---------------------------------------+
                                          |
                      HTTP / HTTPS        | (withCredentials: true)
                      Port: 8000          v
                      +---------------------------------------+
                      |              API GATEWAY              |
                      |  - Centralized CORS & Cookie Parser   |
                      |  - Session Validation via Redis       |
                      |  - Reverse Proxy (express-http-proxy) |
                      +---------------------------------------+
                                  /       |       \
       /api/auth (Port 8001)     /        |        \  /api/file (Port 8003)
      +-------------------------+         |         +-----------------------+
      |      AUTH SERVICE       |         |         |     FILE SERVICE      |
      | - Firebase Admin SDK    |         |         | - Adjacency List Tree |
      | - Google OAuth Exchange |         |         | - O(N) In-Memory Tree |
      | - Redis Session Issuer  |         |         | - Soft Deletes        |
      +-------------------------+         |         +-----------------------+
                   |                      | (x-user-id)         |
                   |       /api/project (Port 8002)             |
                   |      +-----------------------+             |
                   |      |    PROJECT SERVICE    |             |
                   |      | - Project CRUD        |             |
                   |      | - Redis Cache-Aside   |             |
                   |      | - Starred Tracking    |             |
                   |      +-----------------------+             |
                   |                  |                         |
                   v                  v                         v
       +--------------------------------------------------------------------+
       |                           SHARED LAYER                             |
       |  - Redis (:6379): Distributed Sessions & High-Throughput Cache     |
       |  - MongoDB: Separate databases ('auth', 'project', 'file')         |
       +--------------------------------------------------------------------+
```

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Redux Toolkit, React Router v7 |
| **Code Editor** | `@monaco-editor/react` (VS Dark theme, auto-layout, multi-language) |
| **Icons & Animations**| Lucide React, Motion (`motion/react`) |
| **API Gateway** | Express 5, `express-http-proxy`, `cors`, `cookie-parser`, `morgan` |
| **Microservices** | Express 5, Node.js (ES Modules) |
| **Authentication** | Firebase Authentication (Client SDK) + Firebase Admin SDK (Backend) |
| **Databases** | MongoDB Atlas (Mongoose 8), Redis (`ioredis`) |
| **DevOps / Container**| Docker, Docker Compose |

---

## 📂 Repository Structure

```bash
NeuralPad/
├── backend/
│   ├── gateway/         # API Gateway (:8000) - Reverse proxy & protect middleware
│   ├── services/
│   │   ├── auth/        # Auth Service (:8001) - Firebase Admin & User models
│   │   ├── project/     # Project Service (:8002) - Project CRUD & Redis caching
│   │   └── file/        # File Service (:8003) - Adjacency List files & tree builder
│   └── shared/          # Shared Redis client and docker-compose
├── frontend/            # React 19 + Vite frontend
│   ├── src/
│   │   ├── components/  # Monaco Editor, Explorer, Folder, TopBar, BottomPanel
│   │   ├── pages/       # Dashboard and ProjectPage
│   │   ├── redux/       # userSlice, projectSlice, store
│   │   └── features/    # API integration calls
│   └── firebase.js      # Client Firebase configuration
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **Redis** running locally on port `6379` (or via Docker)
- **MongoDB Atlas** cluster or local MongoDB on port `27017`

### 2. Start Redis
```bash
cd backend/shared
docker-compose up -d
```

### 3. Environment Variables
Create `.env` files in each respective directory (these are excluded from git for security):

* **`backend/gateway/.env`**:
  ```env
  PORT=8000
  FRONTEND_URL=http://localhost:5173
  AUTH_SERVICE=http://localhost:8001
  PROJECT_SERVICE=http://localhost:8002
  FILE_SERVICE=http://localhost:8003
  ```

* **`backend/services/auth/.env`**:
  ```env
  PORT=8001
  MONGODB_URI=your_mongodb_auth_connection_string
  REDIS_URL=redis://localhost:6379
  ```
  *(Requires `serviceAccountKey.json` from Firebase Console)*

* **`backend/services/project/.env`**:
  ```env
  PORT=8002
  MONGODB_URI=your_mongodb_project_connection_string
  REDIS_URL=redis://localhost:6379
  ```

* **`backend/services/file/.env`**:
  ```env
  PORT=8003
  MONGODB_URI=your_mongodb_file_connection_string
  REDIS_URL=redis://localhost:6379
  ```

* **`frontend/.env`**:
  ```env
  VITE_FIREBASE_API_KEY=your_firebase_web_api_key
  VITE_SERVER_URL=http://localhost:8000
  ```

### 4. Install Dependencies & Run

```bash
# Run Gateway
cd backend/gateway && npm install && npm run dev

# Run Services (in separate terminals)
cd backend/services/auth && npm install && npm run dev
cd backend/services/project && npm install && npm run dev
cd backend/services/file && npm install && npm run dev

# Run Frontend
cd frontend && npm install && npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 📡 API Gateway Endpoints

All requests route through the Gateway on port `8000`:

| Method | Endpoint | Service Proxied | Protected? | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/login` | Auth (:8001) | No | Verifies token, sets session cookie |
| `POST` | `/api/auth/logout` | Auth (:8001) | No | Deletes Redis session, clears cookie |
| `GET` | `/api/me` | Gateway (:8000) | **Yes** | Returns authenticated user profile |
| `GET` | `/api/project` | Project (:8002) | **Yes** | Lists all user projects (cached in Redis) |
| `POST` | `/api/project` | Project (:8002) | **Yes** | Creates new project & evicts cache |
| `GET` | `/api/project/:id` | Project (:8002) | **Yes** | Gets project details & updates last opened |
| `PATCH`| `/api/project/:id` | Project (:8002) | **Yes** | Toggles starred status & evicts cache |
| `DELETE`| `/api/project/:id`| Project (:8002) | **Yes** | Deletes project & evicts cache |
| `POST` | `/api/file/create-root-folder` | File (:8003) | **Yes** | Initializes root project directory |
| `POST` | `/api/file/create-folder` | File (:8003) | **Yes** | Creates subfolder |
| `POST` | `/api/file/create-file` | File (:8003) | **Yes** | Creates file with language syntax |
| `GET` | `/api/file/tree/:projectId` | File (:8003) | **Yes** | Returns $O(N)$ nested file tree |
| `POST` | `/api/file/update/:id` | File (:8003) | **Yes** | Updates file name or editor content |
| `DELETE`| `/api/file/:id` | File (:8003) | **Yes** | Soft-deletes file (`isDeleted: true`) |

---

## 🗺️ Roadmap

- [ ] **Interactive Terminal & Execution Service**: Sandboxed code execution in isolated Docker containers via WebSockets and `node-pty`.
- [ ] **AI Assistant Service**: Dedicated microservice for streaming LLM-powered code completion, explanation, and error fixing.
- [ ] **Real-time Collaboration**: Multi-cursor editing using CRDTs / Operational Transformation over WebSockets.
- [ ] **Package Manager Integration**: In-browser dependency installation and bundling.

---

## 📄 License
This project is licensed under the MIT License.
