import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi.js";
import Alert from "../components/Alert.jsx";
import { extractAuthData, getDashboardPath, saveAuth } from "../utils/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser(form);
      const { token, role } = extractAuthData(response);

      if (!token) {
        throw new Error("Token missing in response");
      }

      saveAuth({ token, role });
      navigate(getDashboardPath(role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div>
          <p className="brand auth-brand">Task Manager</p>
          <h1>Login</h1>
          <p className="muted">Access role-based dashboard.</p>
        </div>

        <Alert message={error} type="error" />

        <label>
          Email
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
        </label>

        <button className="button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Need an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}