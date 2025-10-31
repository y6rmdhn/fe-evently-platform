import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import useAddEventModal from "./useAddEventModal";
import { ICategory } from "@/types/category";
import { IRegency } from "@/types/event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropsTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchEvent: () => void;
  onOpenChange: () => void;
}

const AddEventModal = (props: PropsTypes) => {
  const { isOpen, onClose, refetchEvent, onOpenChange } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleUploadBanner,
    isPendingMutateUploadFile,
    preview,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,
    dataRegion,
    handleSearchRegion,
    searchRegency,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isPendingMutateAddEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
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
              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    variant="bordered"
                    label="Slug"
                    type="text"
                    isInvalid={!!errors.slug}
                    errorMessage={errors.slug?.message as string}
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data?.data || []}
                    variant="bordered"
                    label="Category"
                    type="text"
                    isInvalid={!!errors.category}
                    errorMessage={errors.category?.message as string}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Search category here"
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={`${category._id}`}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    variant="bordered"
                    label="Start Date"
                    defaultValue={now(getLocalTimeZone())}
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={!!errors.startDate}
                    errorMessage={errors.startDate?.message as string}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    variant="bordered"
                    label="End Date"
                    defaultValue={now(getLocalTimeZone())}
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={!!errors.endDate}
                    errorMessage={errors.endDate?.message as string}
                  />
                )}
              />
              <Controller
                name="isPublished"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    label="Status"
                    isInvalid={!!errors.isPublished}
                    errorMessage={errors.isPublished?.message as string}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="isFeatured"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    label="Featured"
                    isInvalid={!!errors.isFeatured}
                    errorMessage={errors.isFeatured?.message as string}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Yes</SelectItem>
                    <SelectItem key="false">No</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="isOnline"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="bordered"
                    label="Onlone / Offline"
                    isInvalid={!!errors.isOnline}
                    errorMessage={errors.isOnline?.message as string}
                    disallowEmptySelection
                  >
                    <SelectItem key="true">Online</SelectItem>
                    <SelectItem key="false">Offline</SelectItem>
                  </Select>
                )}
              />

              <p className="text-sm font-semibold">Location</p>
              <div className="flex flex-col gap-2">
                <Controller
                  name="region"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data?.data && searchRegency !== ""
                          ? dataRegion?.data?.data
                          : []
                      }
                      variant="bordered"
                      label="City"
                      type="text"
                      isInvalid={!!errors.region}
                      errorMessage={errors.region?.message as string}
                      onInputChange={(search) => handleSearchRegion(search)}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search city here"
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={`${regency.id}`}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      label="Latitude"
                      isInvalid={!!errors.latitude}
                      errorMessage={errors.latitude?.message as string}
                    />
                  )}
                />
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      variant="bordered"
                      label="longitude"
                      isInvalid={!!errors.longitude}
                      errorMessage={errors.longitude?.message as string}
                    />
                  )}
                />
              </div>

              <p className="text-sm font-semibold">Cover</p>
              <Controller
                name="banner"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    isDropable
                    {...field}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isDeleting={isPendingMutateDeleteFile}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={errors.banner !== undefined}
                    errorMessage={errors.banner?.message}
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
                isPendingMutateAddEvent ||
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
                isPendingMutateAddEvent ||
                isPendingMutateUploadFile ||
                isPendingMutateDeleteFile
              }
            >
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
