// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdOutlineTask } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Button from "../ui/Button";
import useTaskStore from "../store/useTaskStore";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

function TaskFormModal() {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const setOpenAddForm = useTaskStore((state) => state.setOpenAddForm);
  const handleAddTask = useTaskStore((state) => state.handleAddTask);
  const user = useAuthStore((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to add a task.");
      return;
    }

    const newTask = {
      taskName,
      dueDate,
      completed: false,
      userId: user.uid,
    };

    if (!taskName.trim()) return;

    handleAddTask(newTask);
    setTaskName("");
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-2xs flex items-center justify-center"
        onClick={() => setOpenAddForm(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl p-6 w-full max-w-[30rem] m-2 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Task name input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="taskName" className="text-sm text-gray-600">
                Task name
              </label>
              <div className="flex items-center gap-2 border px-3 py-2 rounded-md focus-within:ring-2 focus-within:ring-yellow-400">
                <MdOutlineTask size="1.3em" className="text-gray-500" />
                <input
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  type="text"
                  name="taskName"
                  placeholder="Enter task name..."
                  className="flex-1 outline-none bg-transparent"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setTaskName("")}
                  className="text-gray-400 hover:text-black transition"
                >
                  <IoClose size="1.3em" />
                </button>
              </div>
            </div>

            {/* Due date input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="dueDate" className="text-sm text-gray-600">
                Due date
              </label>
              <input
                value={dueDate}
                name="dueDate"
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                id="dueDate"
                className="w-full px-3 py-2 rounded-md border text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-end gap-2">
              <Button type="submit">Create task</Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TaskFormModal;
