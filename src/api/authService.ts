import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiConfig";
import { User } from "../types";

export const authService = {
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }> => {
    const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, credentials);
    return res.data;
  },
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }> => {
    const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, data);
    return res.data;
  },
  getMe: async (): Promise<User> => {
    const res = await axiosInstance.get(API_PATHS.AUTH.GET_ME);
    return res.data;
  },
};
