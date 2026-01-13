import { useState } from "react";
import api from "../api/api.jsx";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/AuthSlice.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/auth/login", form);
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch {
      toast.error("Invalid credentials")
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur rounded-2xl shadow-2xl p-8 border border-gray-800">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-sm text-center mb-8">
          Sign in to continue exploring movies
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          onClick={submit}
          className="w-full mt-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-white shadow-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
