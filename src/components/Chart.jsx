import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useTaskStore from "../store/useTaskStore";

const COLORS = ["#00C49F", "#FFBB28"];

function Chart() {
  const tasks = useTaskStore((state) => state.tasks);

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
    { name: "Completed tasks", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50} // 👈 CREEAZĂ spațiul din mijloc (donut)
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px" }}
            formatter={(value, name) => [
              `${value} task${value !== 1 ? "s" : ""}`,
              name,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legendă colorată */}
      <div className="mb-5 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00C49F]"></span>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FFBB28]"></span>
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}

export default Chart;
