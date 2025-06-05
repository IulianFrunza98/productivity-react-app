import useTaskStore from "../store/useTaskStore";
import TaskItem from "./TaskItem";

function TasksList() {
  const filteredTasks = useTaskStore((state) => state.filteredTasks);

  return (
    <ul className="flex flex-col py-4 px-6 shadow-lg rounded-2xl bg-white dark:bg-gray-800 w-full gap-0 border-t border-b border-gray-300 dark:border-gray-700">
      <h1 className="font-semibold text-xl mb-3 text-gray-900 dark:text-gray-100">
        My tasks {filteredTasks.length > 0 ? `(${filteredTasks.length})` : ""}
      </h1>

      {filteredTasks.length === 0 && (
        <div className="text-gray-600 dark:text-gray-400 text-sm italic">
          You have no tasks yet. Add one above!
        </div>
      )}

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TasksList;
