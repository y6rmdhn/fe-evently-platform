import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/category";
import { addToast } from "@heroui/toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getDetailCategory(id);

    console.log(data);

    return data;
  };

  const { data: dataCategory, refetch: refetchCategory } = useQuery({
    queryKey: ["category-detail"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  const updateCategory = async (payload: ICategory) => {
    const { data } = await categoryServices.updateCategory(
      `${query.id}`,
      payload,
    );

    return data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
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
      refetchCategory();
      addToast({
        title: "Success Update Category",
        color: "success",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  };
};

export default useDetailCategory;
