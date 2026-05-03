import React from "react";
import { useEffect, useState } from "react";
import { adminTaskApi } from "../api/taskApi.js";
import Alert from "../components/Alert.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import TaskForm from "../components/TaskForm.jsx";
import TaskTable from "../components/TaskTable.jsx";

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await adminTaskApi.getTasks();
      setTasks(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(task) {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = editingTask
        ? await adminTaskApi.updateTask(editingTask.id, task)
        : await adminTaskApi.createTask(task);
      setMessage(response.message || (editingTask ? "Task updated." : "Task created."));
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save task.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setMessage("");

    try {
      const response = await adminTaskApi.deleteTask(id);
      setMessage(response.message || "Task deleted.");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete task.");
    }
  }

  return (
    <DashboardLayout title="Admin Dashboard">
      <Alert message={error} type="error" />
      <Alert message={message} type="success" />

      <TaskForm
        initialTask={editingTask}
        mode={editingTask ? "edit" : "create"}
        onSubmit={handleSubmit}
        onCancel={editingTask ? () => setEditingTask(null) : null}
        loading={saving}
      />

      <section className="panel">
        <div className="section-heading">
          <h2>All Tasks</h2>
          <button className="button button-outline" type="button" onClick={loadTasks}>
            Refresh
          </button>
        </div>
        {loading ? <div className="loading">Loading tasks...</div> : <TaskTable tasks={tasks} role="ADMIN" onEdit={setEditingTask} onDelete={handleDelete} />}
      </section>
    </DashboardLayout>
  );
}
