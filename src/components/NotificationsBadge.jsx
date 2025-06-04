import React from "react";
import useTaskStore from "../store/useTaskStore";

function NotificationsBadge() {
  const tasks = useTaskStore((state) => state.tasks);

  // Get today's date without time for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Count tasks with dueDate today or earlier (overdue) and not completed
  const count = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= today && !task.completed;
  }).length;

  if (count === 0) return null;

  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
      {count}
    </span>
  );
}

export default NotificationsBadge;
