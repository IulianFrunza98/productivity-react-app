import useTaskStore from "../store/useTaskStore";
import TaskItem from "./TaskItem";

function TasksList() {
  const filteredTasks = useTaskStore((state) => state.filteredTasks);

  return (
    <ul className="flex flex-col py-4 px-6 shadow-2xs rounded-2xl bg-white w-full gap-0 border-t border-b border-gray-200">
      <h1 className="font-semibold text-xl mb-3">
        My tasks {filteredTasks.length > 0 ? `(${filteredTasks.length})` : ""}
      </h1>

      {filteredTasks.length === 0 && (
        <div className="text-gray-500 text-sm italic">
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
