import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();

  const getCategoryById = async (id: string) => {
    const { data } = await categoryServices.getDetailCategory(id);

    console.log(data);

    return data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["category-detail"],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  return {
    dataCategory,
  };
};

export default useDetailCategory;
