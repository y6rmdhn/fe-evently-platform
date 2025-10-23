import { cn } from "@/utils/cn";
import { div } from "framer-motion/client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropsType {
  name: string;
  isDropable?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const InputFile = (props: PropsType) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const {
    name,
    className,
    isDropable = false,
    errorMessage,
    isInvalid,
    onChange,
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
    setUploadedImage(e.dataTransfer?.files?.[0] || null);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      setUploadedImage(files[0]);
    }

    if (onChange) {
      onChange(e);
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
        {uploadedImage ? (
          <div className="flex flex-col items-center justify-center p-5">
            <div className="mb-2 w-1/2">
              <Image
                fill
                src={URL.createObjectURL(uploadedImage)}
                alt="image"
                className="!relative"
              />
            </div>
            <p className="text-center text-sm font-semibold text-gray-500">
              {uploadedImage.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop an image here, or click to select"
                : "Click to select an image"}
            </p>
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropZoneId}`}
          onChange={handleOnChange}
        />
      </label>

      {isInvalid && (
        <p className="text-danger-500 mt-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
