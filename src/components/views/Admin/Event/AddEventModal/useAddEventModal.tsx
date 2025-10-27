import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/category";
import { DateValue } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please input category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please input status"),
  isFeatured: yup.string().required("Please input featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  banner: yup.mixed<FileList | string>().required("Please upload banner"),
});

const useAddCategoryModal = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback(fileUrl: string) {
          setValue("banner", fileUrl);
        },
      });
    }
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValues("banner");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => onChange(undefined),
      });
    }
  };

  const handleOnClose = (onClose: () => void) => {
    const fileUrl = getValues("banner");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => {
          reset();
          onClose();
        },
      });
    } else {
      reset();
      onClose();
    }
  };

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.AddCategory(payload);

    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      addToast({
        title: error.message,
        color: "danger",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success add category",
        color: "success",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadBanner,
    isPendingMutateUploadFile,
    preview,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddCategoryModal;
