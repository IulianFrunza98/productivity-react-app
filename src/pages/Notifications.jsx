import useTaskStore from "../store/useTaskStore";

function Notifications() {
  const tasks = useTaskStore((state) => state.tasks);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter tasks with dueDate today or earlier (overdue)
  const notifications = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate <= today && !task.completed;
  });

  return (
    <div className="p-6 w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-gray-100">
          Notifications
          {notifications.length > 0 && (
            <span className="inline-block bg-red-600 dark:bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {notifications.length}
            </span>
          )}
        </h1>
      </div>
      {notifications.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No notifications. All tasks are up to date.
        </p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((task) => (
            <li
              key={task.id}
              className="border border-red-400 dark:border-red-700 rounded p-4 bg-red-50 dark:bg-red-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-red-800 dark:text-red-400 text-lg">
                {task.taskName}
              </p>
              <p className="text-sm text-red-700 dark:text-red-500">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
