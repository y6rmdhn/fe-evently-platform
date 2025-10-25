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
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface PropsType {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<React.SetStateAction<string>>;
}

const DeleteCategoryModal = (props: PropsType) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessDeleteCategory]);

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
            onPress={() => mutateDeleteCategory(selectedId)}
            disabled={isPendingMutateDeleteCategory}
          >
            {isPendingMutateDeleteCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Create Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
