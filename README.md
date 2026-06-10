# 📝 Blog Post Management System

A full-stack MERN application to create, read, update, and delete blog posts — built for the **Bits and Volts Pvt. Ltd.** Full Stack Intern Assessment.

---

## 🚀 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, React Router v6, React Hook Form, Yup |
| Backend   | Node.js, Express.js                             |
| Database  | MongoDB (Mongoose)                              |
| Extras    | Axios, react-hot-toast, json2csv                |

---

## 📁 Project Structure

```
blog-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── postController.js  # CRUD + Search + CSV export
│   ├── middleware/
│   │   ├── errorHandler.js    # Global error handler
│   │   └── validatePost.js    # express-validator rules
│   ├── models/
│   │   └── Post.js            # Mongoose schema
│   ├── routes/
│   │   └── postRoutes.js      # REST routes
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── common/
        │   │   ├── Badge.jsx         # Status & Category badges
        │   │   ├── Navbar.jsx
        │   │   ├── Pagination.jsx
        │   │   └── UIComponents.jsx  # Spinner, EmptyState, ConfirmModal
        │   └── posts/
        │       ├── ActionMenu.jsx    # 3-dot dropdown per row
        │       └── PostForm.jsx      # Reusable Add/Edit form
        ├── hooks/
        │   └── usePosts.js           # Data-fetching hook
        ├── pages/
        │   ├── PostListPage.jsx      # Table view with search/filter
        │   ├── AddPostPage.jsx       # Create new post
        │   ├── EditPostPage.jsx      # Update existing post
        │   └── ViewPostPage.jsx      # Post detail view
        ├── services/
        │   └── postService.js        # Axios API calls
        ├── styles/
        │   └── global.css
        ├── utils/
        │   └── validation.js         # Yup schema + constants
        ├── App.jsx                   # Router config
        └── index.js
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                          | Example                                          |
|----------------|--------------------------------------|--------------------------------------------------|
| `PORT`         | Port the Express server listens on   | `5000`                                           |
| `MONGO_URI`    | MongoDB connection string            | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `FRONTEND_URL` | Allowed CORS origin                  | `http://localhost:3000`                          |
| `NODE_ENV`     | Environment                          | `development` or `production`                   |

### Frontend (`frontend/.env`)

| Variable             | Description          | Example                         |
|----------------------|----------------------|---------------------------------|
| `REACT_APP_API_URL`  | Backend API base URL | `http://localhost:5000/api`     |

---

## 🛠️ Local Setup

### Prerequisites
- Node.js >= 16
- MongoDB Atlas account (free tier) or local MongoDB

### 1. Clone the repo
```bash
git clone <repo-url>
cd blog-app
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI and other values in .env
npm install
npm run dev
# Server runs at http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start
# App runs at http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| GET    | `/api/posts`              | Get all posts (pagination, filters)|
| GET    | `/api/posts/:id`          | Get single post by ID              |
| POST   | `/api/posts`              | Create new post                    |
| PUT    | `/api/posts/:id`          | Update post                        |
| DELETE | `/api/posts/:id`          | Delete post                        |
| GET    | `/api/posts/search`       | Search by title, author, category  |
| GET    | `/api/posts/export/csv`   | Export posts as CSV                |

### Query Parameters (GET /api/posts)
- `page` — page number (default: 1)
- `limit` — records per page (default: 10, max: 50)
- `search` — search by title, author, or category
- `category` — filter by category
- `status` — filter by status (Draft / Published)

---

## 🚢 Deployment

### Frontend → Vercel / Netlify
1. Push `frontend/` to GitHub
2. Import repo in Vercel / Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Add env variable: `REACT_APP_API_URL=<your-backend-url>/api`

### Backend → Render / Railway
1. Push `backend/` to GitHub
2. Create a Web Service in Render
3. Set start command: `node server.js`
4. Add env variables: `MONGO_URI`, `FRONTEND_URL`, `PORT`

---

## ✅ Features Checklist

- [x] CRUD for blog posts
- [x] Pagination support
- [x] Search API (title, author, category)
- [x] Export to CSV
- [x] MongoDB via Mongoose
- [x] Responsive design (mobile + desktop)
- [x] Form validation (React Hook Form + Yup + server-side)
- [x] 3 screens: List, Add/Edit form, View details
- [x] Multiple routes
- [x] Component-based architecture
- [x] Success/error notifications (react-hot-toast)
- [x] Proper error handling (global + per-request)
- [x] No inline styles (CSS classes throughout)
- [x] Consistent file structure
