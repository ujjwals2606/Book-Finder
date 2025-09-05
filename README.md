# BookFinder

A full-stack MERN application for discovering and saving books using the Open Library API.

## Features

- 🔍 Search books using Open Library API
- 📚 Save favorite books to your personal collection
- 🎨 Modern UI with dark/light mode toggle
- 📱 Responsive design with Tailwind CSS
- 🔐 JWT-based authentication
- 🎠 Featured books carousel
- 📄 Pagination for search results

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

### Frontend
- React + Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- embla-carousel-react
- Axios for API calls

## Quick Start

### Option 1: Run Everything at Once (Recommended)

1. **Install all dependencies:**
```bash
npm run install:all
```

2. **Set up environment variables:**
   - Copy `server/env.example` to `server/.env` and update with your MongoDB URI
   - Copy `client/env.example` to `client/.env` (default values should work)

3. **Start both client and server:**
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend client on http://localhost:5173

### Option 2: Run Separately

#### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `server/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=supersecret_change_me
CLIENT_ORIGIN=http://localhost:5173
```

4. Start the server:
```bash
npm run dev
```

#### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in `client/` directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```


