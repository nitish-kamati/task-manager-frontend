import React from "react";

export default function TaskTable({ tasks, role, onEdit, onDelete, onStatusChange }) {
  if (!tasks.length) {
    return <div className="empty-state">No tasks found.</div>;
  }

  const showActions = role === "ADMIN" || role === "MANAGER";

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Assigned To</th>
            <th>Status</th>

            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description || "No description"}</td>
              <td>{task.assignedTo || "Unassigned"}</td>

              <td>
                {role === "EMPLOYEE" ? (
                  <select
                    value={task.status || "PENDING"}
                    onChange={(event) =>
                      onStatusChange(task, event.target.value)
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                ) : (
                  <span
                    className={`status status-${String(
                      task.status || "PENDING"
                    ).toLowerCase()}`}
                  >
                    {task.status || "PENDING"}
                  </span>
                )}
              </td>

              {showActions && (
                <td>
                  <div className="row-actions">
                    {role === "ADMIN" && (
                      <button
                        className="button button-small button-outline"
                        type="button"
                        onClick={() => onEdit(task)}
                      >
                        Edit
                      </button>
                    )}

                    {(role === "ADMIN" || role === "MANAGER") && (
                      <button
                        className="button button-small button-danger"
                        type="button"
                        onClick={() => onDelete(task.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}