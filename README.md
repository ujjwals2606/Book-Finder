# Book Finder – Worldwide Edition

A full-stack MERN-style application for searching books worldwide using the Open Library API. Built with React, Node.js, Express, and Tailwind CSS.

## Features

- **Advanced Search**: Search books by title, author, language, and publication year
- **Worldwide Support**: Search books in multiple languages (English, Hindi, French, Spanish, German, Italian, Japanese, Arabic)
- **Detailed Book Information**: View comprehensive book details including description, subjects, places, and time periods
- **Responsive Design**: Clean, modern UI that works on desktop and mobile
- **Real-time Search**: Debounced search with instant results
- **Pagination**: Navigate through large result sets efficiently

## Tech Stack

### Frontend
- React.js with React Router
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- CORS middleware for cross-origin requests
- Axios for external API calls

### External APIs
- Open Library Search API
- Open Library Works API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookfinder
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## API Endpoints

### Backend API

- `GET /api/books/search` - Search books with filters
  - Query parameters: `title`, `author`, `language`, `year`, `page`, `limit`
  - Example: `/api/books/search?title=harry+potter&author=rowling&language=eng&year=1997`

- `GET /api/books/details/:workId` - Get detailed book information
  - Example: `/api/books/details/OL82565W`

- `GET /api/health` - Health check endpoint

## Usage

1. **Basic Search**: Enter a book title in the search bar
2. **Advanced Search**: Click the "Filters" button to access:
   - Author search
   - Language selection
   - Publication year filter
3. **View Details**: Click "View" on any book card to see detailed information
4. **Navigate**: Use pagination to browse through search results

## Language Support

The application supports searching books in the following languages:
- English (eng)
- Hindi (hin)
- French (fre)
- Spanish (spa)
- German (ger)
- Italian (ita)
- Japanese (jpn)
- Arabic (ara)

## Project Structure

```
bookfinder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API configuration
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry point
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details