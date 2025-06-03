import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";

import AppLayout from "./layouts/AppLayout";
import RequireAuth from "./contexts/auth/RequireAuth";

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          position: "top-right",
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
