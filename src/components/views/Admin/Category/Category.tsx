import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import { LIMIT_LIST } from "@/components/constants/list.constant";

const Category = () => {
  const { push } = useRouter();

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

  return (
    <section>
      <DataTable
        onChangeSearch={() => {}}
        onClearSearch={() => {}}
        topButtonContentLabel="Create Category"
        onClickButtonTopContent={() => {}}
        renderCell={renderCell}
        columns={COLUMN_LIST_CATEGORY}
        limit={LIMIT_LIST[0].label}
        onChangeLimit={() => {}}
        currentPage={1}
        onChangePage={() => {}}
        totalPages={2}
        emptyContent="Content is empty"
        data={[
          {
            _id: "123",
            name: "Category 1",
            description: "Desc Category 1",
            icon: "/images/general/evently-logo.png",
          },
        ]}
      />
    </section>
  );
};

export default Category;
