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
import DeleteCategoryModal from "./DeleteCategoryModal";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropDownAction from "@/components/commons/DropDownAction";

const Category = () => {
  const { push, query, isReady } = useRouter();
  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const {
    dataCategory,

    refetchCategory,
    selectedId,
    setSelectedId,
    isLoadingCategory,
    isRefetchingCategory,
  } = useCategory();

  const { setUrl } = useChangeUrl();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellvalue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellvalue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
            />
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
      setUrl();
    }
  }, [isReady]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          topButtonContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
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
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategory}
      />
    </section>
  );
};

export default Category;
