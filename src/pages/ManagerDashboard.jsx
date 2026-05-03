import React from "react";
import { useEffect, useState } from "react";
import { managerTaskApi } from "../api/taskApi.js";
import Alert from "../components/Alert.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskTable from "../components/TaskTable.jsx";

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await managerTaskApi.getTasks();
      setTasks(response || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load your tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(task) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await managerTaskApi.createTask(task);
      setMessage(response.message || "Task created for employee.");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create task.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setMessage("");

    try {
      const response = await managerTaskApi.deleteTask(id);
      setMessage(response.message || "Task deleted.");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task.");
    }
  }

  return (
    <DashboardLayout title="Manager Dashboard">
      <Alert message={error} type="error" />
      <Alert message={message} type="success" />

      <TaskForm onSubmit={handleCreate} loading={saving} />

      <section className="panel">
        <div className="section-heading">
          <h2>Own Tasks</h2>
          <button className="button button-outline" type="button" onClick={loadTasks}>
            Refresh
          </button>
        </div>
        {loading ? <div className="loading">Loading tasks...</div> : <TaskTable tasks={tasks} role="MANAGER" onDelete={handleDelete} />}
      </section>
    </DashboardLayout>
  );
}
