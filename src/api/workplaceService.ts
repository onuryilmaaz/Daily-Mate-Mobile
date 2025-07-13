import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiConfig";
import { Workplace } from "../types";

export const workplaceService = {
  getAll: async (): Promise<Workplace[]> => {
    console.log("WorkplaceService: getAll çağrılıyor");
    const res = await axiosInstance.get(API_PATHS.WORKPLACES.GET_ALL);
    console.log("WorkplaceService: getAll başarılı:", res.data);
    return res.data;
  },
  getActive: async (): Promise<Workplace[]> => {
    console.log("WorkplaceService: getActive çağrılıyor");
    const res = await axiosInstance.get(API_PATHS.WORKPLACES.GET_ACTIVE);
    console.log("WorkplaceService: getActive başarılı:", res.data);
    return res.data;
  },
  create: async (
    data: Omit<Workplace, "_id" | "userId" | "isActive">
  ): Promise<Workplace> => {
    console.log("WorkplaceService: create çağrılıyor:", data);
    const res = await axiosInstance.post(API_PATHS.WORKPLACES.CREATE, data);
    console.log("WorkplaceService: create başarılı:", res.data);
    return res.data;
  },
  update: async (id: string, data: Partial<Workplace>): Promise<Workplace> => {
    console.log("WorkplaceService: update çağrılıyor:", id, data);
    const res = await axiosInstance.put(API_PATHS.WORKPLACES.UPDATE(id), data);
    console.log("WorkplaceService: update başarılı:", res.data);
    return res.data;
  },
  remove: async (id: string): Promise<{ message: string }> => {
    console.log("WorkplaceService: remove çağrılıyor:", id);
    const res = await axiosInstance.delete(API_PATHS.WORKPLACES.DELETE(id));
    console.log("WorkplaceService: remove başarılı:", res.data);
    return res.data;
  },
  toggle: async (
    id: string
  ): Promise<{ message: string; workplace: Workplace }> => {
    console.log("WorkplaceService: toggle çağrılıyor:", id);
    const res = await axiosInstance.patch(API_PATHS.WORKPLACES.TOGGLE(id));
    console.log("WorkplaceService: toggle başarılı:", res.data);
    return res.data;
  },
};
