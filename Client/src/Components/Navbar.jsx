import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/AuthSlice.jsx";
import { toast } from "react-hot-toast";
import { clearFavorites } from "../features/favorites/FavoriteSlice.jsx";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const favoritesCount = useSelector(
    (state) => state.favorites.list.length
  );

  // console.log(user);

  // console.log("Redux user:", user);
  // console.log("Token:", localStorage.getItem("token"));

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearFavorites());
    toast.success("Logged out successfully!");
    setMenuOpen(false);
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `relative transition ${
      isActive
        ? "text-white"
        : "text-gray-300 hover:text-yellow-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-wide text-white hover:text-indigo-400 transition"
        >
          Movie Explorer
        </Link>

        {/* Desktop User Name */}
        <div className="hidden md:block text-white text-lg">
          {user?.name || "Guest"}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {user ? (
            <>
              <NavLink to="/favorites" className={navLinkClass}>
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
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">

          <div className="text-white text-sm">
            {user?.name || "Guest"}
          </div>

          {user ? (
            <>
              <NavLink
                to="/favorites"
                className="block text-gray-300 hover:text-yellow-400"
                onClick={() => setMenuOpen(false)}
              >
                Favorites
                {favoritesCount > 0 && (
                  <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition font-semibold text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block text-gray-300 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="block px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
