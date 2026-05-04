# GerInstagram

A full-stack Instagram-inspired social media platform built as a learning project. Features a Vue 3 SPA frontend and a RESTful Express API backend with PostgreSQL.

---

## Tech Stack

**Frontend**
- Vue 3 + TypeScript
- Vite
- Pinia (state management)
- Vue Router
- Axios
- CSS / SCSS

**Backend**
- Node.js + Express 5
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT authentication
- Multer (file uploads)
- Swagger / OpenAPI docs

**Infrastructure**
- Docker + Docker Compose
- Prisma Migrations

---

## Features

- 👥 Follows — coming soon
- 📖 Stories — coming soon
- 💬 Direct messages — coming soon

---

## Project Structure

```
GerInstagram/
├── src/                  # Vue 3 frontend
│   ├── components/
│   ├── views/
│   ├── stores/           # Pinia stores
│   ├── router/
│   └── styles/
└── in-api/               # Express backend
    ├── src/
    │   ├── modules/      # Feature modules (auth, posts, follows...)
    │   ├── middleware/
    │   ├── routes/
    │   └── config/
    ├── prisma/
    │   └── schema.prisma
    └── docker-compose.yml
```

---

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- Docker + Docker Compose

---

### Step 1 — Clone the repo

```bash
git clone https://github.com/your-username/GerInstagram.git
cd GerInstagram
```

### Step 2 — Install frontend dependencies

```bash
npm install
```

### Step 3 — Install backend dependencies

```bash
cd in-api
npm install
```

### Step 4 — Configure environment

The defaults in `in-api/.env` work out of the box. The only value you should change is `JWT_SECRET`:

```env
JWT_SECRET=your_secret_here
```

### Step 5 — Start the database

```bash
docker compose up -d db
```

### Step 6 — Run database migrations

```bash
npm run prisma:migrate
```

### Step 7 — Seed demo data

> ⚠️ Optional — skip this if you don't need demo data

```bash
npm run prisma:seed
```

---

### Running the project

Open **two terminals**:

**Terminal 1 — backend:**
```bash
cd in-api
npm run dev
# API running at http://localhost:3000
```

**Terminal 2 — frontend:**
```bash
cd GerInstagram
npm run dev
# App running at http://localhost:5173
```

---

## Environment Variables

### Backend (`in-api/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `JWT_SECRET` | Secret for signing tokens | `change_me` |
| `BCRYPT_SALT_ROUNDS` | bcrypt rounds | `10` |

### Frontend (`.env.local`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api/v1` |

---

## API Docs

Swagger UI is available at `http://localhost:3000/api-docs` when the backend is running.

---

## Database Schema

Key models: `User`, `Post`, `Comment`, `Story`, `Follow`, `Notification`, `Report`, `BanLog`, `Media`

Run Prisma Studio to browse data:

```bash
cd in-api
npx prisma studio
```
