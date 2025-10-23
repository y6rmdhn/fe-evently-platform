import axiosInstance from "@/libs/axios/axiosInstance";
import endpoint from "./endpoint.constan";
import { IFileURL } from "@/types/file";

// const formDataHeader = {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// };

const uploadServices = {
  uploadFile: (payload: FormData) =>
    axiosInstance.post(
      `${endpoint.MEDIA}/upload-single`,
      payload,
      // formDataHeader,
    ),
  deleteFile: (payload: IFileURL) =>
    axiosInstance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
