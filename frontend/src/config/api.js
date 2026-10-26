// Dynamic API Base URL configuration for both local development and production deployments (Vercel)
export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
export const API_BASE_URL = `${API_BASE}/api`;
