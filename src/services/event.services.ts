import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { IEvent } from "@/types/event";

const eventServices = {
  getEvents: (params?: string) =>
    axiosInstance.get(`${endpoint.EVENT}?${params}`),
  addEvent: (payload: IEvent) => axiosInstance.post(endpoint.EVENT, payload),
  deleteEvent: (id: string) => axiosInstance.delete(`${endpoint.EVENT}/${id}`),
  searchLocationByRegency: (name: string) =>
    axiosInstance.get(`${endpoint.REGIONS}-search?name=${name}`),
};

export default eventServices;
