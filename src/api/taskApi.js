import api from "./axiosInstance.js";

export const adminTaskApi = {
  getTasks: async () => {
    const response = await api.get("/admin/tasks");
    return response.data;
  },
  createTask: async (payload) => {
    const response = await api.post("/admin/task/create", payload);
    return response.data;
  },
  updateTask: async (id, payload) => {
    const response = await api.put(`/admin/task/${id}`, payload);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/admin/task/${id}`);
    return response.data;
  }
};

export const managerTaskApi = {
  getTasks: async () => {
    const response = await api.get("/manager/tasks");
    return response.data;
  },
  createTask: async (payload) => {
    const response = await api.post("/manager/task/create", payload);
    return response.data;
  },
  deleteTask: async (id) => {
    const response = await api.delete(`/manager/task/${id}`);
    return response.data;
  }
};

export const employeeTaskApi = {
  getTasks: async () => {
    const response = await api.get("/employee/tasks");
    return response.data;
  },
  updateTask: async (id, payload) => {
    const response = await api.put(`/employee/task/${id}`, payload);
    return response.data;
  }
};
