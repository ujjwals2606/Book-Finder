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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
- `GET /api/books/search?q=&page=&limit=` - Search books
- `POST /api/books/save` - Save book for user (protected)
- `GET /api/books/saved` - Get saved books (protected)
- `DELETE /api/books/:key` - Remove saved book (protected)

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=supersecret_change_me
CLIENT_ORIGIN=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Replace `your_mongodb_atlas_uri` in the server `.env` file with your actual MongoDB URI

## Available Scripts

### Root Level
- `npm run dev` - Start both client and server
- `npm run install:all` - Install all dependencies
- `npm run build` - Build the client for production
- `npm start` - Start the production server

### Server
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Client
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
bookfinder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   ├── Navbar.jsx
│   │   │   ├── BookCard.jsx
│   │   │   ├── FeaturedBooksCarousel.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Pagination.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Favorites.jsx
│   │   │   └── BookDetail.jsx
│   │   ├── hooks/         # Custom hooks
│   │   │   └── useDebounce.js
│   │   ├── context/       # React context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── coverUrl.js
│   │   ├── api/           # API layer
│   │   │   └── axios.js
│   │   ├── lib/           # Library utilities
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Express backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   │   ├── User.js
│   │   │   └── SavedBook.js
│   │   ├── routes/        # API routes
│   │   │   ├── auth.js
│   │   │   └── books.js
│   │   ├── middleware/    # Custom middleware
│   │   │   └── requireAuth.js
│   │   └── index.js       # Server entry point
│   ├── package.json
│   └── env.example
├── package.json
└── README.md
```

## Features in Detail

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcrypt

### Book Search
- Real-time search with debouncing
- Integration with Open Library API
- Pagination support
- Cover image display with fallbacks

### Book Management
- Save books to personal collection
- Remove saved books
- View saved books in favorites page
- Book detail pages

### UI/UX
- Responsive design
- Dark/light mode toggle
- Modern UI with shadcn/ui components
- Loading states and error handling
- Accessibility features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
