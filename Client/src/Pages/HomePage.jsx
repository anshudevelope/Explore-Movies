import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../features/movies/MovieSlice.jsx";
import { useCallback, useState } from "react";
import { debounce } from "../utils/debounce";
import Pagination from "../Components/Pagination.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { list, loading, totalResults, currentPage } = useSelector(
    (state) => state.movies
  );

  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim()) {
        dispatch(searchMovies({ query: value, page: 1 }));
      }
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // console.log(list);
  
  const changePage = (page) => {
    dispatch(searchMovies({ query, page }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold tracking-wide mb-2">
          Movie Explorer
        </h1>
        <p className="text-gray-400">
          Search, explore, and save your favorite movies
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-3xl mx-auto mb-10">
        <input
          value={query}
          onChange={handleChange}
          placeholder="Search movies..."
          className="w-full px-5 py-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-700 focus:outline-none animate-pulse focus:animate-pulse focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {query && (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
            {list?.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/no-poster.png"
                  }
                  alt={movie.Title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-semibold truncate">
                    {movie.Title}
                  </h3>

                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="inline-block text-sm text-indigo-400 hover:text-indigo-300 transition"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {totalResults > 10 && (
            <div className="my-12 flex justify-center">
              <Pagination
                page={currentPage}
                total={totalResults}
                onPageChange={changePage}
              />
            </div>
          )}
        </>
      )}

      <div className="space-y-20 my-20">
        {/* Feature Section */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Discover Movies Like Never Before
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Browse thousands of movies, explore detailed information,
              and create your personal favorites list — all in one place.
            </p>
            <p className="text-indigo-400 font-medium">
              Start by searching above ↑
            </p>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8 shadow-xl">
            <ul className="space-y-4 text-gray-300 text-sm">
              <li>✔ Search by movie title</li>
              <li>✔ View detailed movie information</li>
              <li>✔ Save movies to favorites</li>
              <li>✔ Secure authentication</li>
            </ul>
          </div>
        </section>

        {/* Genres */}
        <section className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">
            Popular Genres
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              "Action",
              "Drama",
              "Comedy",
              "Sci-Fi",
              "Thriller",
              "Romance",
              "Horror",
              "Adventure"
            ].map((genre) => (
              <div
                key={genre}
                className="bg-gray-900 border border-gray-800 rounded-xl py-4 text-center text-gray-300 hover:bg-gray-800 transition cursor-default"
              >
                {genre}
              </div>
            ))}
          </div>
        </section>

        {/* Why Section */}
        <section className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">
            Why Movie Explorer?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Fast Search",
                desc: "Instant movie results with debounced search."
              },
              {
                title: "Clean UI",
                desc: "Dark cinematic interface designed for focus."
              },
              {
                title: "Favorites",
                desc: "Save movies and access them anytime."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-900 rounded-2xl p-6 border border-gray-800"
              >
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== SEARCH RESULTS ===== */}
      {loading && (
        <p className="text-center text-gray-400 mt-6">
          Fetching movies...
        </p>
      )}

    </div>
  );
};

export default HomePage;
