import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- ÖNEMLİ ---
// axiosInstance'in baseURL'i 'http://your-api.com/api' gibi '/api' içeriyorsa,
// apiConfig.ts'deki yolların başına '/api' eklememeniz gerekir.
const baseURL: string =
  process.env.EXPO_PUBLIC_API_URL || "http://10.0.2.2:8080/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (İstek Aracısı)
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Yanıt Aracısı)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Başarılı yanıtları doğrudan geri döndürür.
    return response;
  },
  async (error: AxiosError) => {
    // Sunucudan gelen hatayı kontrol ediyoruz.
    const { response } = error;
    if (response && response.status === 401) {
      console.log(
        "Kimlik doğrulama hatası (401). Token geçersiz veya süresi dolmuş. Kullanıcı çıkış yapıyor."
      );

      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");

      // Burada kullanıcıyı Login ekranına yönlendirme mantığı eklenmelidir.
    }

    // Diğer tüm hataları geri döndürüyoruz.
    return Promise.reject(error);
  }
);

export default axiosInstance;
