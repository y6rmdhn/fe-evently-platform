import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import {
  DELAY,
  LIMIT_DEFAULT,
  PAGE_DEFAULT,
} from "@/components/constants/list.constant";
import { ChangeEvent } from "react";

const useChangeUrl = () => {
  const debounce = useDebounce();

  const router = useRouter();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;

      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    setUrl,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    currentLimit,
    currentPage,
    currentSearch,
  };
};

export default useChangeUrl;
