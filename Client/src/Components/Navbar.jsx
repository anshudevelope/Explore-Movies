import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice.jsx";
import { toast } from "react-hot-toast";
import { clearFavorites } from "../features/favorites/FavoriteSlice.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  const dispatch = useDispatch();

  const favoritesCount = useSelector(
    (state) => state.favorites.list.length
  );

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites()); 
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide text-white hover:text-indigo-400 transition"
        >
          Movie Explorer
        </Link>

        <div className="text-white text-xl">
          {user?.name || "Guest"}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `relative transition ${isActive
                    ? "text-white"
                    : "text-gray-300 hover:text-yellow-400"
                  }`
                }
              >
                Favorites
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `transition ${isActive
                    ? "text-indigo-400"
                    : "text-gray-300 hover:text-white"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition font-semibold ${isActive
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-600/90 hover:bg-indigo-700 text-white"
                  }`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
