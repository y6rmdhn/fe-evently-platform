import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { IActivation, ILogin, IRegister } from "@/types/auth";

const authServices = {
  register: (payload: IRegister) =>
    axiosInstance.post(`${endpoint.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    axiosInstance.post(`${endpoint.AUTH}/activation`, payload),
  login: (payload: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    axiosInstance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default authServices;
