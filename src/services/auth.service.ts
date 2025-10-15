import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { IActivation, IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    axiosInstance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    axiosInstance.post(`${endpoint.AUTH}/activation`, payload),
};

export default authServices;
