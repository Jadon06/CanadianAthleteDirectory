const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const browserOrigin = typeof window !== 'undefined' ? window.location.origin : '';

const normalizeApiBaseUrl = (baseUrl: string): string => {
  const trimmed = baseUrl.replace(/\/$/, '');

  // Prevent mixed-content errors when a secure page is paired with an accidental http API URL.
  if (
    typeof window !== 'undefined' &&
    window.location.protocol === 'https:' &&
    trimmed.startsWith('http://') &&
    !trimmed.startsWith('http://localhost') &&
    !trimmed.startsWith('http://127.0.0.1')
  ) {
    return trimmed.replace('http://', 'https://');
  }

  return trimmed;
};

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl || browserOrigin);

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