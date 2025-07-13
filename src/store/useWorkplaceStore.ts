import { create } from "zustand";
import { Workplace } from "../types";
import { workplaceService } from "../api/workplaceService";

type WorkplaceState = {
  workplaces: Workplace[];
  isLoading: boolean;
  fetchWorkplaces: () => Promise<void>;
  addWorkplace: (
    data: Omit<Workplace, "_id" | "userId" | "isActive">
  ) => Promise<void>;
  updateWorkplace: (id: string, data: Partial<Workplace>) => Promise<void>;
  deleteWorkplace: (id: string) => Promise<void>;
  toggleWorkplace: (id: string) => Promise<void>;
};

export const useWorkplaceStore = create<WorkplaceState>((set, get) => ({
  workplaces: [],
  isLoading: false,
  fetchWorkplaces: async () => {
    set({ isLoading: true });
    try {
      console.log("WorkplaceStore: İş yerleri getiriliyor...");
      const data = await workplaceService.getAll();
      console.log("WorkplaceStore: İş yerleri başarıyla getirildi:", data);
      set({ workplaces: data, isLoading: false });
    } catch (error) {
      console.error("WorkplaceStore: İş yerleri getirilemedi:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  addWorkplace: async (newWorkplaceData) => {
    try {
      console.log("WorkplaceStore: İş yeri ekleniyor:", newWorkplaceData);
      await workplaceService.create(newWorkplaceData);
      await get().fetchWorkplaces();
    } catch (error) {
      console.error("WorkplaceStore: İş yeri eklenemedi:", error);
      throw error;
    }
  },
  updateWorkplace: async (id, data) => {
    try {
      console.log("WorkplaceStore: İş yeri güncelleniyor:", id, data);
      await workplaceService.update(id, data);
      await get().fetchWorkplaces();
    } catch (error) {
      console.error("WorkplaceStore: İş yeri güncellenemedi:", error);
      throw error;
    }
  },
  deleteWorkplace: async (id) => {
    try {
      console.log("WorkplaceStore: İş yeri siliniyor:", id);
      await workplaceService.remove(id);
      await get().fetchWorkplaces();
    } catch (error) {
      console.error("WorkplaceStore: İş yeri silinemedi:", error);
      throw error;
    }
  },
  toggleWorkplace: async (id) => {
    try {
      console.log("WorkplaceStore: İş yeri durumu değiştiriliyor:", id);
      await workplaceService.toggle(id);
      await get().fetchWorkplaces();
    } catch (error) {
      console.error("WorkplaceStore: İş yeri durumu değiştirilemedi:", error);
      throw error;
    }
  },
}));
