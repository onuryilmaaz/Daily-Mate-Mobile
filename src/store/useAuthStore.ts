import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: (token, userData) => {
    AsyncStorage.setItem("userToken", token);
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    set({ user: userData, token, isAuthenticated: true });
  },
  logout: () => {
    AsyncStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },
  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem("userToken");
      const userDataString = await AsyncStorage.getItem("userData");
      if (token && userDataString) {
        set({
          token,
          user: JSON.parse(userDataString),
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      set({ isLoading: false });
    }
  },
}));
