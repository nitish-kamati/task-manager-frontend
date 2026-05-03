import React from "react";
import { useEffect, useState } from "react";
import { employeeTaskApi } from "../api/taskApi.js";
import Alert from "../components/Alert.jsx";
import DashboardLayout from "../components/DashboardLayout.jsx";
import TaskTable from "../components/TaskTable.jsx";

export default function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await employeeTaskApi.getTasks();
      setTasks(response || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load assigned tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleStatusChange(task, status) {
    setError("");
    setMessage("");

    try {
      const response = await employeeTaskApi.updateTask(task.id, { ...task, status });
      setMessage(response.message || "Task status updated.");
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update task status.");
    }
  }

  return (
    <DashboardLayout title="Employee Dashboard">
      <Alert message={error} type="error" />
      <Alert message={message} type="success" />

      <section className="panel">
        <div className="section-heading">
          <h2>Assigned Tasks</h2>
          <button className="button button-outline" type="button" onClick={loadTasks}>
            Refresh
          </button>
        </div>
        {loading ? <div className="loading">Loading tasks...</div> : <TaskTable tasks={tasks} role="EMPLOYEE" onStatusChange={handleStatusChange} />}
      </section>
    </DashboardLayout>
  );
}
