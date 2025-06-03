import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex flex-col flex-1 p-4 space-y-4 overflow-auto">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
