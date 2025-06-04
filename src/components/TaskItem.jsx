// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useTaskStore from "../store/useTaskStore";

function TaskItem({ task }) {
  const handleToggleTask = useTaskStore((state) => state.handleToggleTask);
  const handleDeleteTask = useTaskStore((state) => state.handleDeleteTask); // activează funcțional dacă vrei

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center justify-between mb-3 p-4 rounded-lg border-l-4 shadow-sm transition-all
        ${
          task.completed
            ? "bg-green-50 border-green-400"
            : "bg-yellow-50 border-yellow-400"
        } 
        flex-wrap gap-3
      `}
    >
      {/* Checkbox + Task Name */}
      <label className="inline-flex items-center gap-3 cursor-pointer select-none flex-grow">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={task.completed}
          onChange={() => handleToggleTask(task.id)}
        />
        <div
          className="w-5 h-5 rounded-full border border-gray-300
          peer-checked:bg-green-400 peer-checked:border-green-400
          flex items-center justify-center relative transition-colors"
        >
          {task.completed && (
            <FaCheck className="text-white w-3 h-3 pointer-events-none" />
          )}
        </div>
        <span
          className={`text-base select-none ${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.taskName}
        </span>
      </label>

      <span className="text-xs text-gray-500 ml-4 min-w-[6rem] text-right">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </span>

      {/* Status + Delete */}
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            task.completed
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.completed ? "Done" : "Pending"}
        </span>

        <button
          onClick={() => handleDeleteTask(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Delete task"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </motion.li>
  );
}

export default TaskItem;
