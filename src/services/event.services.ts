import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";

const eventServices = {
  getEvents: (params?: string) =>
    axiosInstance.get(`${endpoint.EVENT}?${params}`),
};

export default eventServices;
