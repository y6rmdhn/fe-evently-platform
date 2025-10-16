import environment from "@/config/environment";
import { SessionExtended } from "@/types/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  "Content-type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

axiosInstance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();

    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  async (response) => response,
  (error) => Promise.reject(error),
);

export default axiosInstance;
