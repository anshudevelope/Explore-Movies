import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, page }) => {
    const res = await api.get(`/movies/search?query=${query}&page=${page}`);
    return res.data;
  }
);

export const getMovieDetails = createAsyncThunk(
  "movies/details",
  async (id) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  }
);

const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    list: [],
    details: null,
    totalResults: 0,
    currentPage: 1,
    loading: false
  },
  extraReducers: (builder) => {
    builder

      // 🔹 SEARCH
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.Search || [];
        state.totalResults = Number(action.payload.totalResults || 0);

        // ✅ FIX: update active page
        state.currentPage = action.meta.arg.page;
      })
      .addCase(searchMovies.rejected, (state) => {
        state.loading = false;
        state.list = [];
        state.totalResults = 0;
      })

      // 🔹 DETAILS
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
        state.details = null;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default MovieSlice.reducer;
