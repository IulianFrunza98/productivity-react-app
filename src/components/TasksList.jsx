import { useTask } from "../contexts/tasks/TaskContext";
import TaskItem from "./TaskItem";

function TasksList() {
  const { tasks } = useTask();

  return (
    <ul className="flex flex-col py-4 px-6 shadow-2xs rounded-2xl bg-white w-full max-w-[25rem] gap-0 border-t border-b border-gray-200">
      <h1 className="font-semibold text-xl mb-3">
        My tasks {tasks.length > 0 ? `(${tasks.length})` : ""}
      </h1>

      {tasks.length === 0 && (
        <div className="text-gray-500 text-sm italic">
          You have no tasks yet. Add one above!
        </div>
      )}

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TasksList;
