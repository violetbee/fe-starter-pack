import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if ((session as any)?.accessToken) {
      config.headers.Authorization = `Bearer ${(session as any).accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:token-invalid"));
      }
    }

    if (error.response?.status === 403) {
      console.error("Bu işlem için yetkiniz bulunmuyor.");
      // window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default instance;
