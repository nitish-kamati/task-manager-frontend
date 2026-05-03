
import React from "react";
import { Navigate } from "react-router-dom";
import { getDashboardPath, getRole, isAuthenticated, normalizeRole } from "../utils/auth.js";

export default function ProtectedRoute({ allowedRoles, children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = normalizeRole(getRole());

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getDashboardPath(role)} replace />;
  }

  return children;
}
