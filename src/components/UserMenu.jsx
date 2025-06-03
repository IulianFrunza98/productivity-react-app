// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth/AuthContext";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const menuRef = useRef();

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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="User profile"
        className="text-gray-600 hover:text-yellow-500 cursor-pointer transition flex items-center justify-center p-2 rounded-full"
      >
        <FaUserCircle size={24} />
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
              to="/app/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/app/dashboard"
              className="block  md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/app/tasks"
              className="block md:hidden px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50"
              onClick={() => setOpen(false)}
            >
              My Tasks
            </Link>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
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
