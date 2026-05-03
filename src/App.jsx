import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { getDashboardPath, getRole, isAuthenticated } from "./utils/auth.js";
import { USER_ROLES } from "./constants/index.js";

function HomeRedirect() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getDashboardPath(getRole())} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.MANAGER]}>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.EMPLOYEE]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
