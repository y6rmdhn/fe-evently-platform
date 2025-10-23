import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { ICategory } from "@/types/category";

const categoryServices = {
  getCategories: (params?: string) =>
    axiosInstance.get(`${endpoint.CATEGORY}?${params}`),
  AddCategory: (payload: ICategory) =>
    axiosInstance.post(`${endpoint.CATEGORY}`, payload),
};

export default categoryServices;
