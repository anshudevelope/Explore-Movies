import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../features/favorites/FavoriteSlice.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state =>
    Array.isArray(state.favorites.list) ? state.favorites.list : []
  );

  useEffect(() => {
    if (favorites.length === 0) dispatch(fetchFavorites());
  }, [dispatch, favorites.length]);

  // console.log(favorites);
  
  const handleRemove = async (id) => {
    try {
      await dispatch(removeFavorite(id)).unwrap();
      toast.success("Removed from favorites!");
    } catch {
      toast.error("Failed to remove favorite");
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-gray-400 px-6">
        <p className="text-center text-lg">You have no favorite movies yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">My Favorites</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites?.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.poster !== "N/A" ? movie.poster : "/no-poster.png"}
              alt={movie.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
              <p className="text-gray-400 text-xs">{movie.year}</p>

              <div className="flex justify-between mt-4">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs transition font-semibold"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleRemove(movie._id)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs transition font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
