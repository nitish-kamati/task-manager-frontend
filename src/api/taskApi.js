import api from "./axiosInstance.js";

export const adminTaskApi = {
  getTasks: async () => (await api.get("/admin/tasks")).data,
  createTask: async (payload) => (await api.post("/admin/task/create", payload)).data,
  updateTask: async (id, payload) => (await api.put(`/admin/task/${id}`, payload)).data,
  deleteTask: async (id) => (await api.delete(`/admin/task/${id}`)).data
};

export const managerTaskApi = {
  getTasks: async () => (await api.get("/manager/tasks")).data,
  createTask: async (payload) => (await api.post("/manager/task/create", payload)).data,
  deleteTask: async (id) => (await api.delete(`/manager/task/${id}`)).data
};

export const employeeTaskApi = {
  getTasks: async () => (await api.get("/employee/tasks")).data,
  updateTask: async (id, payload) => (await api.put(`/employee/task/${id}`, payload)).data
};
