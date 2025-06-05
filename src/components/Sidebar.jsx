import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import useAuthStore from "../store/useAuthStore";
import { IoIosStats } from "react-icons/io";
import Logo from "./Logo";
import { MdOutlineNotificationsActive } from "react-icons/md";
import NotificationsBadge from "./NotificationsBadge";

function Sidebar() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-2 rounded transition-colors duration-200
    ${
      isActive
        ? "font-semibold text-gray-900 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/40 border-l-4 border-yellow-500"
        : "text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="hidden md:flex bg-white dark:bg-gray-800 m-4 rounded-2xl py-6 shadow-lg w-[15rem] flex-col h-[calc(100vh-2rem)]">
      <Logo />
      <ul className="space-y-2 w-full mt-4">
        <li>
          <NavLink to="/app/dashboard" className={linkClass}>
            <RxDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/stats" className={linkClass}>
            <IoIosStats className="text-xl" />
            Stats
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/notifications" className={linkClass}>
            <div className="relative flex items-center">
              <MdOutlineNotificationsActive className="text-xl" />
              <NotificationsBadge />
            </div>
            <span className="ml-2">Notifications</span>
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto border-t border-gray-300 dark:border-gray-700 pt-4 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer w-full px-4 py-2 rounded text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <BiLogOut className="text-xl" />
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
