import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { ICategory } from "@/types/category";

const categoryServices = {
  getCategories: (params?: string) =>
    axiosInstance.get(`${endpoint.CATEGORY}?${params}`),
  getDetailCategory: (id: string) =>
    axiosInstance.get(`${endpoint.CATEGORY}/${id}`),
  AddCategory: (payload: ICategory) =>
    axiosInstance.post(`${endpoint.CATEGORY}`, payload),
  deleteCategory: (id: string) =>
    axiosInstance.delete(`${endpoint.CATEGORY}/${id}`),
  updateCategory: (id: string, payload: ICategory) =>
    axiosInstance.put(`${endpoint.CATEGORY}/${id}`, payload),
};

export default categoryServices;
