import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

function PrivateRoutes() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoutes;
