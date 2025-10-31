import { DELAY } from "@/components/constants/list.constant";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.services";
import { IEvent, IEventForm } from "@/types/event";
import { toDateStandart } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  slug: yup.string().required("Please input slug"),
  category: yup.string().required("Please input category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please input status"),
  isFeatured: yup.string().required("Please input featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  latitude: yup.string().required("Please input latitude coordinate"),
  longitude: yup.string().required("Please input longitude coordinate"),
  banner: yup.mixed<FileList | string>().required("Please upload banner"),
});

const useAddEventModal = () => {
  const router = useRouter();
  const [searchRegency, setSearchRegency] = useState("");
  const debounce = useDebounce();

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  setValue("startDate", now(getLocalTimeZone()));
  setValue("endDate", now(getLocalTimeZone()));

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("banner", fileUrl);
      }
    });
  };

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["events"],
    queryFn: async () => await categoryServices.getCategories(),
    enabled: router.isReady,
  });

  const { data: dataRegion } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: async () =>
      await eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.addEvent(payload);

    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError: (error) => {
      addToast({
        title: error.message,
        color: "danger",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Success add event",
        color: "success",
        variant: "bordered",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      reset();
    },
  });

  const handleAddEvent = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isPublished: Boolean(data.isPublished),
      isOnline: Boolean(data.isOnline),
      startDate: toDateStandart(data.startDate),
      endDate: toDateStandart(data.endDate),
      location: {
        region: data.region,
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };

    mutateAddEvent(payload);
  };

  console.log(errors);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    isPendingMutateUploadFile,
    preview,
    isPendingMutateDeleteFile,
    handleOnClose,
    handleDeleteBanner,
    handleUploadBanner,

    dataCategory,
    dataRegion,
    handleSearchRegion,
    searchRegency,
  };
};

export default useAddEventModal;
