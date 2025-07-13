import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/useAuthStore";

// Backend API URL'si - localhost kullanıyoruz
const baseURL =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://daily-mate-backend.onrender.com/api";

console.log("AxiosInstance: BaseURL:", baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    console.log(
      "AxiosInstance: Request gönderiliyor:",
      config.method?.toUpperCase(),
      config.url
    );
    console.log("AxiosInstance: Token:", token ? "Mevcut" : "Yok");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    console.error("AxiosInstance: Request hatası:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      "AxiosInstance: Response başarılı:",
      response.status,
      response.config.url
    );
    return response;
  },
  async (error: AxiosError) => {
    console.error(
      "AxiosInstance: Response hatası:",
      error.response?.status,
      error.config?.url
    );
    console.error("AxiosInstance: Hata detayı:", error.response?.data);
    if (error.response && error.response.status === 401) {
      console.log("Token geçersiz veya süresi dolmuş, çıkış yapılıyor.");
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
