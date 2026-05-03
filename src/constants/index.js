export const TASK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  ADMIN: {
    TASKS: '/admin/tasks',
    CREATE_TASK: '/admin/task/create',
    UPDATE_TASK: (id) => `/admin/task/${id}`,
    DELETE_TASK: (id) => `/admin/task/${id}`
  },
  MANAGER: {
    TASKS: '/manager/tasks',
    CREATE_TASK: '/manager/task/create',
    DELETE_TASK: (id) => `/manager/task/${id}`
  },
  EMPLOYEE: {
    TASKS: '/employee/tasks',
    UPDATE_TASK: (id) => `/employee/task/${id}`
  }
};

export const DASHBOARD_PATHS = {
  [USER_ROLES.ADMIN]: '/admin',
  [USER_ROLES.MANAGER]: '/manager',
  [USER_ROLES.EMPLOYEE]: '/employee'
};

export const STORAGE_KEYS = {
  TOKEN: 'task_manager_token',
  ROLE: 'task_manager_role'
};
