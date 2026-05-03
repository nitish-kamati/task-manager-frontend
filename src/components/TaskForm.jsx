import React from "react";
import { useEffect, useState } from "react";
import { TASK_STATUS } from "../constants/index.js";

const emptyTask = {
  title: "",
  description: "",
  assignedTo: "",
  status: TASK_STATUS.PENDING
};

export default function TaskForm({ initialTask, mode = "create", showAssignee = true, onSubmit, onCancel, loading }) {
  const [task, setTask] = useState(emptyTask);

  useEffect(() => {
    setTask({ ...emptyTask, ...initialTask });
  }, [initialTask]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(task);
  }

  return (
    <form className="panel task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Title
          <input name="title" value={task.title} onChange={handleChange} placeholder="Task title" required />
        </label>

        {showAssignee && (
          <label>
            Assigned to
            <input name="assignedTo" value={task.assignedTo} onChange={handleChange} placeholder="Employee ID" />
          </label>
        )}

        <label>
          Status
          <select name="status" value={task.status} onChange={handleChange}>
            <option value={TASK_STATUS.PENDING}>Pending</option>
            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={TASK_STATUS.COMPLETED}>Completed</option>
          </select>
        </label>
      </div>

      <label>
        Description
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Task details" rows="3" />
      </label>

      <div className="form-actions">
        {onCancel && (
          <button className="button button-outline" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Saving..." : mode === "edit" ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
