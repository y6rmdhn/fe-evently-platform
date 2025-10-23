import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const { push, query, isReady } = useRouter();
  const addCategoryModal = useDisclosure();
  const {
    setURL,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    currentLimit,
    currentPage,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    refetchCategory,
  } = useCategory();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellvalue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellvalue}`} alt="icon" width={100} height={200} />
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category-button"
                  className="text-danger-500"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          );
        default:
          return cellvalue as ReactNode;
          break;
      }
    },
    [push],
  );

  useEffect(() => {
    if (isReady) {
      setURL();
    }
  }, [isReady]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          topButtonContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          currentPage={Number(currentPage)}
          onChangePage={handleChangePage}
          totalPages={dataCategory?.pagination.totalPages}
          emptyContent="Content is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          data={dataCategory?.data || []}
        />
      )}
      <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
