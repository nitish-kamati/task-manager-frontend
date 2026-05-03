import { STORAGE_KEYS, DASHBOARD_PATHS, USER_ROLES } from '../constants/index.js';

export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getRole() {
  return localStorage.getItem(STORAGE_KEYS.ROLE);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function saveAuth({ token, role }) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.ROLE, normalizeRole(role));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ROLE);
}

export function normalizeRole(role) {
  return String(role || "").replace("ROLE_", "").toUpperCase();
}

export function getDashboardPath(role) {
  const normalizedRole = normalizeRole(role);
  return DASHBOARD_PATHS[normalizedRole] || "/login";
}

export function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(payload)));
  } catch {
    return {};
  }
}

export function extractAuthData(apiResponse) {
  const data = apiResponse?.data || apiResponse || {};
  const token = data.token || data.jwt || data.accessToken;
  const decoded = token ? decodeJwtPayload(token) : {};
  const role =
    data.role ||
    data.user?.role ||
    decoded.role ||
    decoded.authorities?.[0]?.authority ||
    decoded.roles?.[0];

  return {
    token,
    role: normalizeRole(role)
  };
}
