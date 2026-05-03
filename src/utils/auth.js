import { STORAGE_KEYS, DASHBOARD_PATHS, USER_ROLES } from '../constants/index.js';

export function getToken() {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  console.log('Getting token:', token ? 'exists' : 'missing');
  return token;
}

export function getRole() {
  return localStorage.getItem(STORAGE_KEYS.ROLE);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function saveAuth({ token, role }) {
  console.log('Saving auth:', { token, role });
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.ROLE, normalizeRole(role));
  console.log('Auth saved. Token exists:', !!localStorage.getItem(STORAGE_KEYS.TOKEN));
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
  // Handle different response structures
  let data = apiResponse;
  
  // If response has data property, use that
  if (apiResponse?.data) {
    data = apiResponse.data;
  }
  
  // Extract token from various possible locations
  const token = data.token || data.jwt || data.accessToken;
  
  // Extract role from various possible locations
  let role = data.role;
  
  // If no role found, try to decode from JWT token
  if (!role && token) {
    try {
      const decoded = decodeJwtPayload(token);
      role = decoded.role || decoded.authorities?.[0]?.authority || decoded.roles?.[0];
    } catch (e) {
      console.warn('Failed to decode JWT token for role extraction');
    }
  }
  
  // If still no role, default to ADMIN for mock mode
  if (!role && token && token.includes('mock')) {
    role = 'ADMIN';
  }

  return {
    token,
    role: normalizeRole(role)
  };
}
