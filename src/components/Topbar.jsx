import Search from "./Search";
import { FaBell } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import UserMenu from "./UserMenu";
import { useTask } from "../contexts/tasks/TaskContext";
import TaskFormModal from "./TaskFormModal";
import Button from "../ui/Button";

function Topbar() {
  const { openAddForm, setOpenAddForm } = useTask();

  return (
    <nav className="bg-white w-full p-3 shadow-2xs rounded-2xl flex items-center justify-between max-w-full">
      <div className="flex-1 min-w-0">
        <Search />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Button
          onClick={() => setOpenAddForm((prev) => !prev)}
          className="hidden md:flex items-center gap-2"
        >
          <LuPlus className="text-sm" />
          <span className="text-sm">New Task</span>
        </Button>
        <button
          aria-label="Notifications"
          className="text-gray-600 hover:text-yellow-500 cursor-pointer transition-colors duration-200"
        >
          <FaBell size={20} />
        </button>
        <UserMenu />
      </div>

      {openAddForm && <TaskFormModal />}
    </nav>
  );
}

export default Topbar;
