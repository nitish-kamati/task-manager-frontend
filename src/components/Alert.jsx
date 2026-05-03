import React from "react";

export default function Alert({ message, type = "info" }) {
  if (!message) return null;

  return <div className={`alert alert-${type}`}>{message}</div>;
}
