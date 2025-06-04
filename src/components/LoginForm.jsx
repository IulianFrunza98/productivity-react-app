import { FaGoogle } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm() {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Added state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/app";

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleGoogleLogin() {
    setLoading(true);
    await loginWithGoogle();
    navigate(from, { replace: true });
    setLoading(false);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={!email || !password}
          className="cursor-pointer bg-yellow-400 text-black border-1 px-4 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
