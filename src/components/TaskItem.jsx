// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { useTask } from "../contexts/tasks/TaskContext";

function TaskItem({ task }) {
  const { handleToggleTask } = useTask();

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-2"
    >
      <label className="inline-flex items-center gap-3 cursor-pointer select-none flex-grow">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={task.completed}
          onChange={() => handleToggleTask(task.id)}
        />
        <div
          className="
            w-5 h-5 rounded-full border
            peer-checked:bg-yellow-400 peer-checked:border
            flex items-center justify-center
            transition-colors
            relative
            focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2"
        >
          <FaCheck className="absolute inset-0 m-auto text-white w-3 h-3 pointer-events-none" />
        </div>
        <span
          className={`text-base select-none ${
            task.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {task.taskName}
        </span>
      </label>
    </motion.li>
  );
}

export default TaskItem;
