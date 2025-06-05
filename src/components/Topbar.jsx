import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import TaskFormModal from "./TaskFormModal";
import Button from "../ui/Button";
import useTaskStore from "../store/useTaskStore";
import UserMenu from "./UserMenu";
import { NavLink } from "react-router-dom";

function Topbar() {
  const openAddForm = useTaskStore((state) => state.openAddForm);
  const setOpenAddForm = useTaskStore((state) => state.setOpenAddForm);

  return (
    <nav className="bg-white dark:bg-gray-800 w-full p-3 shadow-md rounded-2xl flex items-center justify-between max-w-full transition-colors duration-300">
      <div className="flex-1 min-w-0">
        <Search />
      </div>

      <div className="hidden md:flex items-center gap-4 ml-4">
        <Button
          onClick={() => setOpenAddForm((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <LuPlus className="text-sm" />
          <span className="text-sm">New Task</span>
        </Button>

        <NavLink
          to="/app/profile"
          aria-label="User profile"
          className="hidden text-gray-700 hover:text-yellow-500 cursor-pointer transition md:flex items-center justify-center p-2 rounded-full"
        >
          <FaUserCircle className="dark:text-yellow-300" size={24} />
        </NavLink>
        <UserMenu />
      </div>

      <div className="flex md:hidden items-center gap-4 ml-4">
        <UserMenu />
        <Button
          onClick={() => setOpenAddForm((prev) => !prev)}
          className="flex items-center gap-2"
        >
          <LuPlus className="text-sm" />
        </Button>
      </div>

      {openAddForm && <TaskFormModal />}
    </nav>
  );
}

export default Topbar;
