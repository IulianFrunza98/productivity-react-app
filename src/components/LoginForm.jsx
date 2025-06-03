import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/app";

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xs"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border bg-white border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Your email"
          aria-label="Email address"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="border bg-white border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Your password"
          aria-label="Password"
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          className="cursor-pointer bg-yellow-400 text-black border-1 px-4 py-2 rounded hover:bg-yellow-500 transition"
        >
          Login
        </button>
        <button
          disabled={loading}
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 cursor-pointer bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 hover:brightness-110 transition"
          aria-label="Sign in with Google"
        >
          {loading ? (
            "Loading..."
          ) : (
            <>
              <FaGoogle />
              <span>Sign in with Google</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
