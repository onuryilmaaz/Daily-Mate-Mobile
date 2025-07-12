import axiosInstance from "../utils/axiosInstance"; // Yeni instance'ı import et
import { API_PATHS } from "../utils/apiConfig"; // Yeni yolları import et

// createWorkplace fonksiyonunun yeni hali
export const createWorkplace = async (data: {
  name: string;
  dailyWage: number;
  color?: string;
}) => {
  // Artık token veya tam URL belirtmeye gerek yok!
  const res = await axiosInstance.post(API_PATHS.WORKPLACES.CREATE, data);
  return res.data;
};

// updateWorkplace fonksiyonunun yeni hali
export const updateWorkplace = async (
  id: string,
  data: {
    name?: string;
    dailyWage?: number;
    color?: string;
    isActive?: boolean;
  }
) => {
  const res = await axiosInstance.put(API_PATHS.WORKPLACES.UPDATE(id), data);
  return res.data;
};

// deleteWorkplace fonksiyonunun yeni hali
export const deleteWorkplace = async (id: string) => {
  const res = await axiosInstance.delete(API_PATHS.WORKPLACES.DELETE(id));
  return res.data;
};

// Diğer fonksiyonlar da bu mantıkla güncellenir...
