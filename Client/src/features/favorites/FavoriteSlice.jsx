import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.jsx";

export const fetchFavorites = createAsyncThunk("favorites/fetch", async () => {
  const res = await api.get("/favorites");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
});

export const addFavorite = createAsyncThunk("favorites/add", async (movie) => {
  const res = await api.post("/favorites", movie);
  return res.data;
});

export const removeFavorite = createAsyncThunk("favorites/remove", async (id) => {
  await api.delete(`/favorites/${id}`);
  return id;
});

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: { list: [] },
  reducers: {
    clearFavorites: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        const exists = state.list.some((f) => f.imdbID === action.payload.imdbID);
        if (!exists) state.list.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.list = state.list.filter((f) => f._id !== action.payload);
      });
  },
});

export const { clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
