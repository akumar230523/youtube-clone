# YouTube Clone
A full-stack **YouTube Clone** built with the **MERN** stack. Features include video browsing, search, filtering, comments, along with channel and video management.

---

## 🛠️ Technology Stack
- **Frontend** – HTML, CSS, React, Axios
- **Backend** – Node.js, Express.js
- **Database** – MongoDB (Atlas)
- **Authentication** – JWT (JSON Web Tokens)
- **Version control** – Git & GitHub

## 🚀 Setup
1. Clone the repository:
    ```
    git clone https://github.com/akumar230523/youtube-clone.git
    ```
2. Navigate the project folder:
    ```
    cd youtube-clone
    ```
3. Backend Setup:
    ```
    cd backend
    npm install
    ```
    Create a **.env** file in the backend/ folder
    ```
    MONGO_URL=your_mongodb_connection_string
    PORT=5000
    JWT_SECRET=your_jwt_secret_key
    ```
4. Frontend Setup:
    ```
    cd frontend
    npm install
    ```
    Create a **.env** file in the frontend/ folder
    ```
    VITE_API_URL=http://localhost:5000
    ```
5. Run the Application:
    - Start backend
    ```
    cd backend
    npm run dev
    ```
    - Start frontend
    ```
    cd frontend
    npm run dev
    ```
    - Open the app in your browser at http://localhost:5173

## ✨ Features
- **Interactive Interface** – Modern layout with a header, sidebar, and responsive video grid.
- **Search & Filters** – Search videos by title and filter by category.
- **User Authentication** – Sign up, Sign in, and token-based authentication using JWT.
- **Video Playback** – Play videos with title, description, comments, and related video suggestions.
- **Channel & Video Management** – Full CRUD operations for channels and videos.
- **Comment System** – Add, and delete comments on videos.
- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices.

## 🔗 Live Demo
👉 [YouTube](https://youtube-6xin.onrender.com/)

---


