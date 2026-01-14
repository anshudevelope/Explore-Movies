# 🎬 Movie Explorer – MERN Stack Application

Movie Explorer is a full-stack MERN application that allows users to search movies, view detailed information, and manage a personalized list of favorite movies.  
The project demonstrates real-world authentication, protected routes, API integration, Redux Toolkit state management, and scalable backend architecture.

---

## Features

### Movie Search
- Search movies by title using OMDB API
- Debounced search for optimized API usage
- Pagination support for large result sets

### Movie Details
- View detailed movie information
- Ratings, plot, actors, director, language, runtime, country
- Optimized UI with fallback images

### Favorites Management
- Add movies to favorites
- Remove movies from favorites
- Favorites stored securely in MongoDB
- Favorites count displayed in navbar

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Persistent login using localStorage

### State Management
- Redux Toolkit for global state
- Async API handling using `createAsyncThunk`
- Centralized auth and favorites state

### UI / UX
- Modern dark UI
- Tailwind CSS
- Responsive design
- Clean component structure

---

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Middleware-based architecture

---

## Project Structure

Movie-Explorer/
│
├── Client/
│ ├── public/
│ ├── src/
│ │ ├── api/ # Axios instance & interceptors
│ │ ├── components/ # Reusable UI components
│ │ ├── features/ # Redux slices
│ │ │ ├── auth/
│ │ │ ├── movies/
│ │ │ └── favorites/
│ │ ├── pages/ # Application pages
│ │ ├── routes/ # Protected routes
│ │ ├── utils/ # Helper utilities (debounce, etc.)
│ │ ├── store.js # Redux store
│ │ └── main.jsx
│ ├── index.html
│ ├── vite.config.js
│ └── package.json
│
├── Server/
│ ├── config/ # Database & environment config
│ ├── controllers/ # Request handlers
│ ├── middlewares/ # Auth & error middlewares
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── utils/ # Helper utilities
│ ├── index.js # Server entry point
│ └── package.json
│
└── README.md

---

## 🔐 Authentication Flow

1. User logs in or registers
2. Backend returns JWT token
3. Token stored in `localStorage`
4. Axios interceptor attaches token to every request
5. Protected routes check Redux auth state
6. Unauthorized users are redirected to login

---

## Redux Architecture

### Auth Slice
- Stores authenticated user
- Persists user data using localStorage
- Handles login and logout

### Movies Slice
- Fetches movies list
- Fetches single movie details
- Handles loading and pagination

### Favorites Slice
- Fetch favorites from backend
- Add/remove favorite movies
- Prevents duplicates
- Syncs UI with MongoDB

---

## API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login

### Movies

GET /api/movies/search
GET /api/movies/:id

### Favorites (Protected)

GET /api/favorites
POST /api/favorites
DELETE /api/favorites/:id

---

## Environment Variables

### Backend (`Server/.env`)

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
OMDB_API_KEY=your_omdb_key

---

## Testing APIs

- All APIs tested using Postman
- Postman collection can be created for:
  - Auth
  - Movies
  - Favorites
- JWT token required for protected routes

---

## Security Best Practices

- JWT authentication
- Protected API routes
- Token validation middleware
- Secure Axios interceptor
- Environment-based configuration

---

## Scalability & Improvements

- Add refresh token flow
- Role-based authorization
- Redux Persist
- Server-side pagination
- Unit & integration testing
- Docker deployment

---

## Learning Outcomes

- Real-world MERN architecture
- Redux Toolkit best practices
- Auth state persistence
- API design & protection
- Clean and scalable folder structure

## Author

**Ansh**  
MERN Stack Developer  


