import { CustomAxiosRequestConfig } from "@/interface/interfaces";
import { showAlertError, showAlertSuccess } from "@/util/Alerts/Alerts";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    config.showSuccess = true;
    config.showAlerts = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const config = response.config as CustomAxiosRequestConfig;
    const isSuccess = response.data?.message || response.data?.messages;

    if (config?.showSuccess && isSuccess) {
      const messageSuccess =
        response.data?.message || response.data?.messages || "Exito";

      if (messageSuccess) {
        showAlertSuccess(messageSuccess, true);
      }
    }

    return response;
  },
  async (error) => {
    const config = error.config as CustomAxiosRequestConfig;
    const { showAlerts = true } = config || {};

    if (showAlerts) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.messages ||
        "A ocurrido un error";

      showAlertError(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
