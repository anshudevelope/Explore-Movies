import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice.jsx";
import movieReducer from "../features/movies/MovieSlice.jsx";
import favoriteReducer from "../features/favorites/FavoriteSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    favorites: favoriteReducer
  }
});
