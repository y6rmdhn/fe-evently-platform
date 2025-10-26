import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import { COLUMN_LIST_EVENT } from "./Event.constant";
import DropDownAction from "@/components/commons/DropDownAction";

const Event = () => {
  const { push, query, isReady } = useRouter();
  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();
  const {
    dataEvent,
    refetchEvent,
    selectedId,
    setSelectedId,
    isLoadingEvent,
    isRefetchingEvent,
  } = useEvent();

  const { setUrl } = useChangeUrl();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellvalue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              className="aspect-auto w-36 rounded-lg object-cover"
              src={`${cellvalue}`}
              alt="icon"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              color={cellvalue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellvalue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                // deleteEventModal.onOpen();
              }}
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
          topButtonContentLabel="Create Event"
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          columns={COLUMN_LIST_EVENT}
          totalPages={dataEvent?.pagination.totalPages}
          emptyContent="Event is empty"
          isLoading={isLoadingEvent || isRefetchingEvent}
          data={dataEvent?.data || []}
        />
      )}
      {/* <AddCategoryModal
        {...addCategoryModal}
        refetchCategory={refetchEvent}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchEvent}
      /> */}
    </section>
  );
};

export default Event;
