import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks((prev) => [...prev, task]);
    toast.success("Task added!");
  }

  function handleToggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        handleToggleTask,
        handleAddTask,
        openAddForm,
        setOpenAddForm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within an TaskProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TaskProvider, useTask };
