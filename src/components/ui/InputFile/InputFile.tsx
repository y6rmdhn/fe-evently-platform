import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropsType {
  name: string;
  isDropable?: boolean;
  className?: string;
  onUpload?: (file: FileList) => void;
  onDelete?: () => void;
  preview?: string;
  isInvalid?: boolean;
  isUploading?: boolean;
  isDeleting?: boolean;
  errorMessage?: string;
}

const InputFile = (props: PropsType) => {
  const {
    name,
    className,
    isDropable = false,
    errorMessage,
    isInvalid,
    onUpload,
    onDelete,
    preview,
    isDeleting,
    isUploading,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropZoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const files = e.dataTransfer?.files;

    if (files && onUpload) {
      onUpload(files);
    }
  };

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropZone = drop.current;

    if (dropZone) {
      dropZone.addEventListener("dragover", handleDragOver);
      dropZone.addEventListener("drop", handleDrop);

      return () => {
        dropZone.removeEventListener("dragover", handleDragOver);
        dropZone.removeEventListener("drop", handleDrop);
      };
    }
  }, []);

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropZoneId}`}
        className={cn(
          "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
          className,
          { "border-danger-500": isInvalid },
        )}
      >
        {preview && (
          <div className="relative flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image fill src={preview} alt="image" className="!relative" />
            </div>
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="bg-primary-100 absolute top-2 right-2 flex h-9 w-9 items-center justify-center rounded"
            >
              {isDeleting ? (
                <Spinner size="sm" color="white" />
              ) : (
                <CiTrash className="text-danger-500 h-5 w-5" />
              )}
            </Button>
          </div>
        )}

        {!preview && (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop an image here, or click to select"
                : "Click to select an image"}
            </p>
          </div>
        )}

        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner size="md" color="primary" />
          </div>
        )}

        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropZoneId}`}
          onChange={handleOnUpload}
          disabled={preview !== ""}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("change", { bubbles: true }));
          }}
        />
      </label>

      {isInvalid && (
        <p className="text-danger-500 mt-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
