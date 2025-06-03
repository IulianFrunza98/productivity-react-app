import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="p-8 text-center text-gray-500 animate-pulse">
        Loading app...
      </div>
    );

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  return children;
}

export default RequireAuth;
