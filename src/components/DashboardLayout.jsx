import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth, getRole } from "../utils/auth.js";

const links = {
  ADMIN: [{ label: [], path: "/admin" }],
  MANAGER: [{ label: [], path: "/manager" }],
  EMPLOYEE: [{ label: [], path: "/employee" }]
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
          {(links[role] || []).map((link) => (
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
