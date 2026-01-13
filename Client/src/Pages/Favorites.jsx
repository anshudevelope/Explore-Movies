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

  const user = useSelector((state) => state.auth.user);

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

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center space-y-2">
        <p className="text-sm text-gray-400">
          User: {user?.name ? `${user.name}` : ""}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          My Favorites
        </h2>
      </div>

      {/* Favorites Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites?.map((movie) => (
          <div
            key={movie._id}
            className="group bg-gray-900 rounded-2xl shadow-md overflow-hidden
                   transition-all duration-300 hover:-translate-y-2
                   hover:shadow-2xl hover:shadow-indigo-500/10"
          >
            {/* Poster */}
            <div className="relative overflow-hidden">
              <img
                src={movie.poster !== "N/A" ? movie.poster : "/no-poster.png"}
                alt={movie.title}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold truncate">
                {movie.title}
              </h3>

              <p className="text-gray-400 text-xs">
                {movie.year}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3">
                <Link
                  to={`/movie/${movie.imdbID}`}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/90
                         hover:bg-indigo-700 text-white text-xs
                         transition font-semibold"
                >
                  View
                </Link>

                <button
                  onClick={() => handleRemove(movie._id)}
                  className="px-3 py-1.5 rounded-lg bg-red-600/90
                         hover:bg-red-700 text-white text-xs
                         transition font-semibold"
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
