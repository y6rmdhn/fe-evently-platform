import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useIconTab from "./useIconTab";

interface PropsType {
  currentIcon: string;
  onUpdate: (data: { icon: FileList | string }) => void;
  isPendingUpdateCategory: boolean;
  isSuccessUpdateCategory: boolean;
}

const IconTab = (props: PropsType) => {
  const {
    currentIcon,
    onUpdate,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = props;

  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errorUpdateIcon,
    handleSubmitUpdateIcon,
    resetUpadteIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdateCategory) {
      resetUpadteIcon();
    }
  }, [isSuccessUpdateCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="text-small text-default-400 w-full">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">current icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="!relative" />
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                isDropable
                {...field}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                onDelete={() => handleDeleteIcon(onChange)}
                isDeleting={isPendingMutateDeleteFile}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorUpdateIcon.icon !== undefined}
                errorMessage={errorUpdateIcon.icon?.message}
                preview={typeof preview === "string" ? preview : ""}
                className="mb-2"
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload New Icon
                  </p>
                }
              />
            )}
          />

          <Button
            color="primary"
            className="disabled:bg-default-500 mt-2"
            type="submit"
            disabled={
              isPendingMutateUploadFile || isPendingUpdateCategory || !preview
            }
          >
            {isPendingUpdateCategory ? (
              <Spinner color="white" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
