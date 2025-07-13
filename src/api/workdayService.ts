import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiConfig";
import { Workday } from "../types";

export const workdayService = {
  getAll: async (): Promise<Workday[]> => {
    console.log("WorkdayService: getAll çağrılıyor");
    const res = await axiosInstance.get(API_PATHS.WORKDAYS.GET_ALL);
    console.log("WorkdayService: getAll başarılı:", res.data);
    return res.data;
  },
  create: async (data: {
    workplaceId: string;
    date: string;
    wageOnThatDay?: number;
  }): Promise<Workday> => {
    console.log("WorkdayService: create çağrılıyor:", data);
    const res = await axiosInstance.post(API_PATHS.WORKDAYS.CREATE, data);
    console.log("WorkdayService: create başarılı:", res.data);
    return res.data;
  },
  update: async (
    id: string,
    data: { workplaceId: string; wageOnThatDay?: number }
  ): Promise<Workday> => {
    console.log("WorkdayService: update çağrılıyor:", id, data);
    const res = await axiosInstance.put(API_PATHS.WORKDAYS.UPDATE(id), data);
    console.log("WorkdayService: update başarılı:", res.data);
    return res.data;
  },
  remove: async (id: string): Promise<{ message: string }> => {
    console.log("WorkdayService: remove çağrılıyor:", id);
    const res = await axiosInstance.delete(API_PATHS.WORKDAYS.DELETE(id));
    console.log("WorkdayService: remove başarılı:", res.data);
    return res.data;
  },
  getThisMonthStats: async (): Promise<any> => {
    console.log("WorkdayService: getThisMonthStats çağrılıyor");
    const res = await axiosInstance.get(
      API_PATHS.WORKDAYS.GET_THIS_MONTH_STATS
    );
    console.log("WorkdayService: getThisMonthStats başarılı:", res.data);
    return res.data;
  },
};
