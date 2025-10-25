import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);

    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      addToast({
        title: error?.message || "Failed to delete category",
        variant: "bordered",
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Category deleted successfully",
        variant: "bordered",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessDeleteCategory,
  };
};

export default useDeleteCategoryModal;
