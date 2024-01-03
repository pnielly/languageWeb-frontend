import axios from "axios";
import store from "../redux/store";
import { frontendConfig } from "../config/config";

export const api = axios.create({
  baseURL: `${`http://localhost:3001` || frontendConfig.apiBaseUrl}`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method?.toUpperCase() || ""} - ${config.baseURL || ""}/${
        config.url || ""
      }`
    );
    const token = store.getState().auth.token || sessionStorage.getItem("token");
    if (token || config?.url?.includes("connect")) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      throw new Error("Authorization token is missing");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
