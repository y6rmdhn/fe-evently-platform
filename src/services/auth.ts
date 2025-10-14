import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    axiosInstance.post(`${endpoint.AUTH}/register`, payload),
};

export default authServices;
