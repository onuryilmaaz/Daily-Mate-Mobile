import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiConfig";

// createWorkDay fonksiyonunun yeni hali
export const createWorkDay = async (data: {
  workplaceId: string;
  date: string;
  wageOnThatDay?: number;
}) => {
  const res = await axiosInstance.post(API_PATHS.WORKDAYS.CREATE, data);
  return res.data;
};

// updateWorkDay fonksiyonunun yeni hali
export const updateWorkDay = async (
  id: string,
  data: { workplaceId: string; wageOnThatDay?: number }
) => {
  const res = await axiosInstance.put(API_PATHS.WORKDAYS.UPDATE(id), data);
  return res.data;
};

// deleteWorkDay fonksiyonunun yeni hali
export const deleteWorkDay = async (id: string) => {
  const res = await axiosInstance.delete(API_PATHS.WORKDAYS.DELETE(id));
  return res.data;
};
