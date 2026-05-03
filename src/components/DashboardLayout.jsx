import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth, getRole } from "../utils/auth.js";
import { DASHBOARD_PATHS, USER_ROLES } from "../constants/index.js";

const navigationConfig = {
  [USER_ROLES.ADMIN]: [{ label: "Dashboard", path: DASHBOARD_PATHS[USER_ROLES.ADMIN] }],
  [USER_ROLES.MANAGER]: [{ label: "Dashboard", path: DASHBOARD_PATHS[USER_ROLES.MANAGER] }],
  [USER_ROLES.EMPLOYEE]: [{ label: "Dashboard", path: DASHBOARD_PATHS[USER_ROLES.EMPLOYEE] }]
};

export default function DashboardLayout({ title, children }) {
  const navigate = useNavigate();
  const role = getRole();

  function handleLogout() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div>
          <p className="brand">Task Manager</p>
          <p className="role-badge">{role}</p>
        </div>

        <nav className="nav-list">
          {(navigationConfig[role] || []).map((link) => (
            <NavLink key={link.path} to={link.path} className="nav-link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="button button-outline" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">Role-based Task Management</p>
            <h1>{title}</h1>
          </div>
        </header>
        {children}

        <footer className="footer">
          © 2026 Task Manager | Built by Nitish
        </footer>
      </main>
    </div>
  );
}
