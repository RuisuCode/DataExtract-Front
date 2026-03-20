import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const API_URL =
  (import.meta as any).env.API_URL ||
  (import.meta as any).env.VITE_API_URL ||
  "http://localhost:3333";

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Vital to send/receive cookies
});

// Interceptor for handling sessions
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Session expired or unauthorized
      useAuthStore.getState().openLoginModal();
    }
    return Promise.reject(error);
  }
);

