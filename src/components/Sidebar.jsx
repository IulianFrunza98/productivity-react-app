import { NavLink, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../contexts/auth/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-2 rounded transition-colors duration-200
    ${
      isActive
        ? "font-semibold text-gray-800 bg-yellow-100 border-l-4 border-yellow-500"
        : "text-gray-600 hover:bg-yellow-50"
    }`;

  return (
    <nav className="hidden md:flex bg-white m-4 rounded-2xl py-6 shadow-2xs w-[15rem]  flex-col h-[calc(100vh-2rem)]">
      <span className="text-2xl font-extrabold mb-8 px-4">Focusly</span>
      <ul className="space-y-2 w-full">
        <li>
          <NavLink to="/app/dashboard" className={linkClass}>
            <RxDashboard className="text-xl" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/app/tasks" className={linkClass}>
            <MdOutlineTaskAlt className="text-xl" />
            My Tasks
          </NavLink>
        </li>
      </ul>

      <div className="mt-auto border-t border-gray-200 pt-4 px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 cursor-pointer w-full px-4 py-2 rounded text-gray-600 hover:bg-yellow-50 transition-colors duration-200"
        >
          <BiLogOut className="text-xl" />
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;
