export const API_PATHS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    GOOGLE_LOGIN: "/auth/google",
    GET_ME: "/auth/me",
  },
  WORKPLACES: {
    CREATE: "/workplaces",
    GET_ACTIVE: "/workplaces",
    GET_ALL: "/workplaces/all",
    UPDATE: (workplaceId: string): string => `/workplaces/${workplaceId}`,
    DELETE: (workplaceId: string): string => `/workplaces/${workplaceId}`,
    TOGGLE: (workplaceId: string): string =>
      `/workplaces/${workplaceId}/toggle`,
  },
  WORKDAYS: {
    CREATE: "/workdays",
    GET_ALL: "/workdays",
    UPDATE: (workdayId: string): string => `/workdays/${workdayId}`,
    DELETE: (workdayId: string): string => `/workdays/${workdayId}`,
    GET_THIS_MONTH_STATS: "/workdays/stats/this-month",
  },
};
