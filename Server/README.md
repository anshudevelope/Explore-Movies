### Explore Movies - Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- OMDb API
- Search Queries
- Pagination

---

## Project Structure

Movie-Explorer/
│
├── Server/ # Backend (Node + Express)
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── middlewares/ # Auth & error middlewares
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── utils/ # Helpers (JWT, async handler)
│ ├── .env
│ ├── index.js # Server entry point
│ ├── package.json
| └── README.md
|
└── Client

---

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes

### Movie Search
- Search movies by title
- Debounced search input
- Pagination
- OMDb API integration

### Movie Details
- Full movie information
- Poster, genre, actors, plot
- Add to favorites

### Favorites
- Add / remove favorites
- Favorites stored in MongoDB
- User-specific favorites
- Real-time navbar count

---



