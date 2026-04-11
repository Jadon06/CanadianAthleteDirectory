import type { NavigateFunction } from 'react-router-dom';
import { apiUrl } from './api';

export const usernameFromFullName = (fullName?: string): string => {
  if (!fullName) {
    return 'me';
  }

  return fullName.trim().replace(/\s+/g, '_') || 'me';
};

export const buildDashboardPath = (username: string): string => {
  const normalized = (username || 'me').trim();
  return `/dashboard/${encodeURIComponent(normalized || 'me')}`;
};

export const resolveCurrentDashboardUsername = async (): Promise<string> => {
  try {
    const response = await fetch(apiUrl('/users/me/'), {
      method: 'GET',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json() as { full_name?: string; first_name?: string; last_name?: string };
      const fallbackFullName = [data.first_name, data.last_name].filter(Boolean).join(' ').trim();
      return usernameFromFullName(data.full_name || fallbackFullName);
    }
  } catch {
    // Fallback below.
  }

  return 'me';
};

export const navigateToOwnDashboard = async (navigate: NavigateFunction): Promise<void> => {
  const username = await resolveCurrentDashboardUsername();
  navigate(buildDashboardPath(username));
};
