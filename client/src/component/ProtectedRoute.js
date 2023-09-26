import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const initialName = localStorage.getItem("name");

  if (initialName) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
