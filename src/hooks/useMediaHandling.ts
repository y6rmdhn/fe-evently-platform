import uploadServices from "@/services/upload.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useMediaHandling = () => {
  const uploadFile = async (
    file: File,
    callback: (fileUrl: string) => void,
  ) => {
    const formData = new FormData();

    formData.append("file", file);

    const {
      data: {
        data: { secure_url: fileUrl },
      },
    } = await uploadServices.uploadFile(formData);

    callback(fileUrl);
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (fileUrl: string) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        addToast({
          title: error.message,
          color: "danger",
          variant: "bordered",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      },
    });

  const deleteFile = async (fileUrl: string, callback: () => void) => {
    const res = await uploadServices.deleteFile({ fileUrl });

    if (res.data.meta.status === 200) {
      callback();
    }
  };

  const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } =
    useMutation({
      mutationFn: (variables: { fileUrl: string; callback: () => void }) =>
        deleteFile(variables.fileUrl, variables.callback),
      onError: (error) => {
        addToast({
          title: error.message,
          color: "danger",
          variant: "bordered",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrl?: string) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback,
      });
    }
  };

  const handleDeleteFile = (
    fileUrl: string | FileList | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback,
      });
    } else {
      callback;
    }
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMediaHandling;
