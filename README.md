# 🚀 AI Agent Dashboard

A Full Stack AI Agent Management Dashboard built using **React.js** and **Django REST Framework**.
The application allows users to register, login, and manage their AI agents (posts) securely using JWT authentication.

---

## 📌 Project Overview

AI Agent Dashboard is a secure full-stack web application where users can:

* Register and login using JWT authentication
* Create, update, and delete AI agents
* View personal agents only
* Access protected APIs
* Manage profile information

The backend ensures user-level data protection so users cannot modify or delete others' data.

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router
* Lucide Icons

### Backend

* Django
* Django REST Framework
* JWT Authentication
* SQLite (Development)

---

## 📂 Project Structure

```
assignment/
│
├── backend/
│   ├── accounts/
│   ├── post/
│   ├── backend/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔐 Authentication

This project uses **JWT Authentication**.

After login, an access token is stored in local storage and sent in headers:

```
Authorization: Bearer <access_token>
```

---

## 📡 API Endpoints

### ✅ Authentication APIs

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/register/` | Register new user          |
| POST   | `/api/login/`    | Login user and get token   |
| GET    | `/api/user/`     | Get logged-in user profile |

---

### ✅ Post (AI Agent) APIs

| Method | Endpoint                  | Description      |
| ------ | ------------------------- | ---------------- |
| GET    | `/api/posts/`             | Get user's posts |
| POST   | `/api/posts/create/`      | Create new post  |
| PUT    | `/api/posts/update/<id>/` | Update post      |
| DELETE | `/api/posts/delete/<id>/` | Delete post      |

✅ Users can only update/delete their own posts.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Devangvarshney/ai-agent-dashboard.git
cd ai-agent-dashboard
```

---

### 2️⃣ Backend Setup

```
cd backend
python -m venv env
env\Scripts\activate     # Windows

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

---

## 👨‍💻 How to Contribute

1. Fork the repository
2. Clone your fork

```
git clone https://github.com/YOUR_USERNAME/ai-agent-dashboard.git
```

3. Create a new branch

```
git checkout -b feature-name
```

4. Make changes and commit

```
git add .
git commit -m "Added new feature"
```

5. Push changes

```
git push origin feature-name
```

6. Create a Pull Request

---

## ✅ Future Improvements

* Role-based authentication
* AI agent execution pipeline
* Deployment (Docker + Cloud)
* Real-time updates

---

## 👤 Author

**Devang Varshney**
B.Tech (GGSIPU)
AI/ML & Full Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
