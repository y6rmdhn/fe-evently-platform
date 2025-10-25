import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchCategory: () => void;
  onOpenChange: () => void;
}

const AddCategoryModal = (props: PropsTypes) => {
  const { isOpen, onClose, refetchCategory, onOpenChange } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add New Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Name"
                    type="text"
                    autoFocus
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message as string}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    variant="bordered"
                    label="Description"
                    type="text"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message as string}
                  />
                )}
              />
              <p className="text-sm font-semibold">Icon</p>
              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    isDropable
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isDeleting={isPendingMutateDeleteFile}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    preview={typeof preview === "string" ? preview : ""}
                    className="mb-2"
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="bordered"
              onPress={() => handleOnClose(onClose)}
              disabled={
                isPendingMutateAddCategory ||
                isPendingMutateUploadFile ||
                isPendingMutateDeleteFile
              }
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={
                isPendingMutateAddCategory ||
                isPendingMutateUploadFile ||
                isPendingMutateDeleteFile
              }
            >
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
