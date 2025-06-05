import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar />
      <main className="flex flex-col flex-1 p-4 space-y-4 overflow-auto">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
