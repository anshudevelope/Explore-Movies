# 🎬 Movie Explorer – MERN Stack Application

Movie Explorer is a full-stack MERN application that allows users to search movies using the OMDb API, view detailed information, manage favorites, and securely authenticate users.  
The project follows **industry-standard folder structure**, **Redux Toolkit**, and **REST API best practices**.

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
- MongoDB + Mongoose
- JWT Authentication
- OMDb API

---

## Project Structure

Movie-Explorer/
│
├── Client/ # Frontend (React)
│ ├── public/
│ ├── src/
│ │ ├── api/ # Axios configuration
│ │ ├── app/ # Redux store
│ │ ├── components/ # Reusable UI components
│ │ ├── features/ # Redux slices (auth, movies, favorites)
│ │ ├── pages/ # Page components
│ │ ├── routes/ # Protected routes
│ │ ├── utils/ # Utility functions (debounce, helpers)
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
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
│ └── package.json
│
└── README.md


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



