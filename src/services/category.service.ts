import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";

const categoryServices = {
  getCategories: (params?: string) =>
    axiosInstance.get(`${endpoint.CATEGORY}?${params}`),
};

export default categoryServices;
