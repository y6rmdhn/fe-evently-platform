import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { Dispatch, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropsType {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchEvent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<React.SetStateAction<string>>;
}

const DeleteEventModal = (props: PropsType) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteEvent,
    isSuccessDeleteEvent,
    mutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessDeleteEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessDeleteEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-medium font-semibold">
            Are you sure you want to delete this category?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="bordered"
            onPress={() => {
              onClose;
              setSelectedId("");
            }}
            disabled
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            onPress={() => mutateDeleteEvent(selectedId)}
            disabled={isPendingMutateDeleteEvent}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
