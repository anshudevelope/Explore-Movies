import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails } from "../features/movies/MovieSlice.jsx";
import { addFavorite } from "../features/favorites/FavoriteSlice.jsx";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.favorites.list || []);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center text-gray-400">
        Loading movie details...
      </div>
    );
  }

  if (!details) return null;

  const isFavorite = favorites.some((movie) => movie.imdbID === details.imdbID);

  const handleAddFavorite = async () => {
    if (isFavorite) {
      toast("Movie is already in favorites", { icon: "ℹ️" });
      return;
    }

    try {
      await dispatch(
        addFavorite({
          imdbID: details.imdbID,
          title: details.Title,
          poster: details.Poster,
          year: details.Year,
        })
      ).unwrap();

      toast.success("Added to favorites!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add favorite");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        {/* Poster */}
        <div className="md:col-span-1 flex justify-center">
          <img
            src={details.Poster !== "N/A" ? details.Poster : "/no-poster.png"}
            alt={details.Title}
            className="rounded-2xl shadow-2xl w-full max-w-sm"
          />
        </div>

        {/* Movie Info */}
        <div className="md:col-span-2 space-y-5">
          <h2 className="text-4xl font-bold tracking-wide">
            {details.Title}
            <span className="text-gray-400 text-xl ml-3">({details.Year})</span>
          </h2>

          <p className="text-sm text-indigo-400 font-medium uppercase tracking-wider">
            {details.Genre}
          </p>

          <p className="text-gray-300 leading-relaxed">{details.Plot}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
            <p>
              <span className="text-gray-400">Actors:</span> {details.Actors}
            </p>
            <p>
              <span className="text-gray-400">Director:</span> {details.Director}
            </p>
            <p>
              <span className="text-gray-400">Language:</span> {details.Language}
            </p>
            <p>
              <span className="text-gray-400">Runtime:</span> {details.Runtime}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button
              onClick={handleAddFavorite}
              disabled={isFavorite}
              className={`px-8 py-3 rounded-xl transition font-semibold shadow-lg ${
                isFavorite
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isFavorite ? "Already Added" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
