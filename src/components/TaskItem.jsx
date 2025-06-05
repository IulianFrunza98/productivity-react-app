// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import useTaskStore from "../store/useTaskStore";

function TaskItem({ task }) {
  const handleToggleTask = useTaskStore((state) => state.handleToggleTask);
  const handleDeleteTask = useTaskStore((state) => state.handleDeleteTask);

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center justify-between mb-3 p-4 rounded-lg border-l-4 shadow-md transition-all
        ${
          task.completed
            ? "bg-green-50 dark:bg-green-700 border-green-400 dark:border-green-500"
            : "bg-yellow-50 dark:bg-yellow-700 border-yellow-400 dark:border-yellow-500"
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
          className="w-5 h-5 rounded-full border border-gray-300 dark:border-white
          peer-checked:bg-green-400 peer-checked:border-green-400
          flex items-center justify-center relative transition-colors"
        >
          {task.completed && (
            <FaCheck className="text-white w-3 h-3 pointer-events-none" />
          )}
        </div>
        <span
          className={`text-base select-none ${
            task.completed
              ? "line-through text-gray-400 dark:text-gray-600"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {task.taskName}
        </span>
      </label>

      <span className="text-xs text-gray-500 dark:text-white ml-4 min-w-[6rem] text-right">
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No due date"}
      </span>

      {/* Status + Delete */}
      <div className="flex items-center gap-3">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            task.completed
              ? "bg-green-100 dark:bg-green-600 text-green-700 dark:text-green-100"
              : "bg-yellow-100 dark:bg-yellow-600 text-yellow-700 dark:text-yellow-100"
          }`}
        >
          {task.completed ? "Done" : "Pending"}
        </span>

        <button
          onClick={() => handleDeleteTask(task.id)}
          className="text-gray-400 dark:text-gray-300 cursor-pointer hover:text-red-500 transition-colors"
          title="Delete task"
        >
          <FaTrashAlt className="w-4 h-4" />
        </button>
      </div>
    </motion.li>
  );
}

export default TaskItem;
