import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateIcon = yup.object({
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useIconTab = () => {
  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errorUpdateIcon },
    getValues: getValuesUpdateIcon,
    watch: watchUpdateIcon,
    setValue: setValueUpdateIcon,
    reset: resetUpadteIcon,
  } = useForm({
    resolver: yupResolver(schemaUpdateIcon),
  });

  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const preview = watchUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback(fileUrl: string) {
          setValueUpdateIcon("icon", fileUrl);
        },
      });
    }
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateIcon("icon");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({
        fileUrl,
        callback: () => onChange(undefined),
      });
    }
  };

  return {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateIcon,
    errorUpdateIcon,
    handleSubmitUpdateIcon,
    resetUpadteIcon,

    preview,
  };
};

export default useIconTab;
