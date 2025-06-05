import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingDarkModeToggle from "./ui/FloatingDarkModeToggle";

const Homepage = lazy(() => import("./pages/Homepage"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Stats = lazy(() => import("./pages/Stats"));
const Notifications = lazy(() => import("./pages/Notifications"));

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
        <FloatingDarkModeToggle />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Homepage />} />

            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />
              <Route
                path="notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
