import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function RegisterForm({ onToggle }) {
  const registerWithEmail = useAuthStore((state) => state.registerWithEmail);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app";

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xs mx-auto"
    >
      <h2 className="text-xl font-semibold text-center">Create account</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="border bg-white border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            className="border bg-white border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition w-full"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            required
            minLength={6}
            className="border bg-white border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition w-full"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={!email || !password || !confirmPassword || loading}
          className="cursor-pointer bg-yellow-400 text-black border px-4 py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </div>

      <div className="text-center text-sm mt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-yellow-500 font-medium hover:underline"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
