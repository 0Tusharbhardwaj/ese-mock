# AI-Powered Candidate Shortlisting System

A complete MERN stack application with OpenRouter AI integration to help recruiters manage and shortlist candidates. Features a premium dashboard UI inspired by Stitch AI.

## 📂 3. Folder Structure

```
ai-shortlist-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── candidateController.js
│   │   └── matchController.js
│   ├── models/
│   │   └── Candidate.js       # Mongoose schema
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── matchRoutes.js
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express entry point
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── pages/
    │   │   ├── AddCandidate.jsx
    │   │   ├── CandidateList.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── MatchCandidates.jsx
    │   ├── App.jsx
    │   ├── index.css          # Tailwind and global styles
    │   └── main.jsx
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 4. Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (or local MongoDB)
- OpenRouter API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (or use the provided `.env`).
4. Start the server:
   ```bash
   npm run dev
   # or
   node server.js
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## s 5. MongoDB Setup Steps

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Under "Database Access", create a new database user with a password.
3. Under "Network Access", add `0.0.0.0/0` to allow access from anywhere (or restrict to your IP).
4. Click "Connect" -> "Connect your application".
5. Copy the connection string. Replace `<password>` with your database user's password.
6. Paste the connection string into your backend `.env` file as `MONGO_URI`.

## 🤖 6. OpenRouter Setup Steps

1. Go to [OpenRouter.ai](https://openrouter.ai/) and create an account.
2. Navigate to the API Keys section.
3. Click "Create API Key" and give it a name.
4. Copy the generated API Key.
5. Paste it into your backend `.env` file as `OPENROUTER_API_KEY`.

## 🌍 7. Deployment Steps

### Backend Deployment (Render / Railway)
1. Push your code to a GitHub repository.
2. Sign up on [Render.com](https://render.com) or Railway.
3. Create a new "Web Service" and connect your GitHub repo.
4. Set the Root Directory to `backend/`.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `node server.js`.
7. Add your Environment Variables (`MONGO_URI`, `OPENROUTER_API_KEY`).
8. Deploy!

### Frontend Deployment (Vercel / Netlify)
1. Sign up on [Vercel](https://vercel.com).
2. Create a new project and import your GitHub repository.
3. Set the Root Directory to `frontend/`.
4. The Build Command should automatically detect Vite (`npm run build`).
5. Set the Environment Variables if you have any API URLs (e.g., `VITE_API_URL`).
6. Update the `axios` base URLs in your React components to point to your deployed backend URL instead of `http://localhost:5000`.
7. Deploy!
