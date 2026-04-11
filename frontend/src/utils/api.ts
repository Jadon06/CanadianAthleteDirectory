const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';

export const API_BASE_URL = (rawApiBaseUrl || browserOrigin).replace(/\/$/, '');

export const apiUrl = (path: string): string => {
  if (!path.startsWith('/')) {
    return `${API_BASE_URL}/${path}`;
  }

  return `${API_BASE_URL}${path}`;
};

export const wsUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = API_BASE_URL || window.location.origin;
  const url = new URL(base);
  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = normalizedPath;
  url.search = '';
  url.hash = '';
  return url.toString();
};