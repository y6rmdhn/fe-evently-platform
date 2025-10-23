import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { ICategory, ICategoryForm } from "@/types/category";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name of caregory"),
  description: yup.string().required("Please input description of category"),
  icon: yup.mixed<FileList>().required("Please upload icon for category"),
});

const useAddCategoryModal = () => {
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadIcon = async (data: ICategoryForm) => {
    const formData = new FormData();

    formData.append("file", data.icon[0]);

    const {
      data: {
        data: { secure_url: icon },
      },
    } = await uploadServices.uploadFile(formData);

    return { name: data.name, description: data.description, icon };
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

  const { mutate: mutateAddFile, isPending: isPendingMutateAddFile } =
    useMutation({
      mutationFn: uploadIcon,
      onError: (error) => {
        addToast({
          title: error.message,
          color: "danger",
          variant: "bordered",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      },
      onSuccess: (payload) => {
        mutateAddCategory(payload);
      },
    });

  const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateAddFile,
  };
};

export default useAddCategoryModal;
