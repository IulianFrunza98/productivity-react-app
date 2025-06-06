// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MdMenu } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { RxDashboard } from "react-icons/rx";
import { IoIosStats } from "react-icons/io";
import { MdOutlineNotificationsActive } from "react-icons/md";
import NotificationsBadge from "./NotificationsBadge";
import { BiLogOut } from "react-icons/bi";
import Logo from "./Logo";

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

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-2 rounded transition-colors duration-200 ${
      isActive
        ? "font-semibold text-gray-900 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500"
        : "text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-800"
    }`;

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
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs dark:bg-gray-900 bg-white border-r rounded-r-xl shadow-md z-50 overflow-auto"
            >
              <nav className="flex flex-col h-full py-6">
                <Logo />
                <ul className="space-y-2 w-full mt-4 flex-grow">
                  <li>
                    <NavLink
                      to="/app/dashboard"
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      <RxDashboard className="text-xl" />
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/app/stats"
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      <IoIosStats className="text-xl" />
                      Stats
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/app/notifications"
                      className={linkClass}
                      onClick={() => setOpen(false)}
                    >
                      <div className="relative flex items-center">
                        <MdOutlineNotificationsActive className="text-xl" />
                        <NotificationsBadge />
                      </div>
                      <span className="ml-2">Notifications</span>
                    </NavLink>
                  </li>
                </ul>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 cursor-pointer w-full px-4 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-800 transition-colors duration-200 mt-auto"
                >
                  <BiLogOut className="text-xl" />
                  Log out
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;
