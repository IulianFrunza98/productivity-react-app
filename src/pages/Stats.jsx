import { FaTasks, FaCheckCircle, FaClock } from "react-icons/fa";
import useTaskStore from "../store/useTaskStore";
import Chart from "../components/Chart";
import FlipCard from "../components/FlipCard";

function Stats() {
  const tasks = useTaskStore((state) => state.tasks);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const today = new Date().setHours(0, 0, 0, 0);
  const dueToday = tasks.filter(
    (t) =>
      !t.completed &&
      t.dueDate &&
      new Date(t.dueDate).setHours(0, 0, 0, 0) === today
  ).length;

  const overdue = tasks.filter(
    (t) =>
      !t.completed &&
      t.dueDate &&
      new Date(t.dueDate).setHours(0, 0, 0, 0) < today
  ).length;

  const percentage =
    totalTasks === 0 ? 0 : Math.floor((completedTasks / totalTasks) * 100);

  return (
    <section className="p-6 max-w-7xl mx-auto flex flex-col gap-10">
      {/* Cards container */}
      <div className="flex flex-wrap justify-center gap-6">
        <FlipCard
          icon={<FaTasks />}
          label="Total Tasks"
          value={totalTasks}
          className="flex-shrink-0 w-72 min-h-[180px]"
        >
          Includes all tasks you’ve created. <br />
          Completion rate: <strong>{percentage}%</strong>
        </FlipCard>

        <FlipCard
          icon={<FaCheckCircle />}
          label="Completed"
          value={completedTasks}
          className="flex-shrink-0 w-72 min-h-[180px]"
        >
          You’ve completed <strong>{completedTasks}</strong> out of{" "}
          <strong>{totalTasks}</strong> tasks.
        </FlipCard>

        <FlipCard
          icon={<FaClock />}
          label="Deadlines"
          value={pendingTasks}
          className="flex-shrink-0 w-72 min-h-[180px]"
        >
          <ul className="list-disc ml-5 space-y-1">
            <li>Pending: {pendingTasks}</li>
            <li>Due Today: {dueToday}</li>
            <li>Overdue: {overdue}</li>
          </ul>
        </FlipCard>
      </div>

      {/* Motivational message */}
      <div className="bg-yellow-50 p-4 rounded-xl text-center text-yellow-700 font-semibold shadow-inner">
        {completedTasks === totalTasks && totalTasks > 0
          ? "🎉 Great job! You've completed all your tasks!"
          : `You have ${pendingTasks} pending task${
              pendingTasks !== 1 ? "s" : ""
            }. Keep going!`}
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          Progress Chart
        </h2>
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center">
            No tasks to display.
          </p>
        ) : (
          <Chart />
        )}
      </div>
    </section>
  );
}

export default Stats;
