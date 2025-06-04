// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const menuRef = useRef();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative md:hidden" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User profile"
        className="text-gray-600 hover:text-yellow-500 cursor-pointer transition flex items-center justify-center p-2 rounded-full"
      >
        <MdMenu size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-md z-50 overflow-hidden"
          >
            <Link
              to="/app/dashboard"
              className="block  md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/app/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            <Link
              to="/app/stats"
              className="block md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              Stats
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;
