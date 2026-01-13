import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import MovieDetails from "./Pages/MovieDetail";
import Favorites from "./Pages/Favorites";
import PrivateRoute from "./Routes/ProtectedRoutes";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import { fetchFavorites } from "./features/favorites/FavoriteSlice.jsx";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Fetch favorites when user logs in or refreshes the page
  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites());
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <Navbar />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid #1f2937",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
