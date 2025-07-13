import { create } from "zustand";
import { Workday } from "../types";
import { workdayService } from "../api/workdayService";

type WorkdayState = {
  workdays: Workday[];
  isLoading: boolean;
  fetchWorkdays: () => Promise<void>;
  addWorkday: (data: { workplaceId: string; date: string }) => Promise<void>;
  removeWorkday: (id: string) => Promise<void>;
};

export const useWorkdayStore = create<WorkdayState>((set, get) => ({
  workdays: [],
  isLoading: false,
  fetchWorkdays: async () => {
    set({ isLoading: true });
    try {
      console.log("WorkdayStore: Çalışma günleri getiriliyor...");
      const data = await workdayService.getAll();
      console.log("WorkdayStore: Çalışma günleri başarıyla getirildi:", data);
      set({ workdays: data, isLoading: false });
    } catch (error) {
      console.error("WorkdayStore: Çalışma günleri getirilemedi:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  addWorkday: async (newWorkdayData) => {
    try {
      console.log("WorkdayStore: Çalışma günü ekleniyor:", newWorkdayData);
      await workdayService.create(newWorkdayData);
      await get().fetchWorkdays();
    } catch (error) {
      console.error("WorkdayStore: Çalışma günü eklenemedi:", error);
      throw error;
    }
  },
  removeWorkday: async (id: string) => {
    try {
      console.log("WorkdayStore: Çalışma günü siliniyor:", id);
      await workdayService.remove(id);
      await get().fetchWorkdays();
    } catch (error) {
      console.error("WorkdayStore: Çalışma günü silinemedi:", error);
      throw error;
    }
  },
}));
