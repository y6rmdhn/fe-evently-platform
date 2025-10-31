import eventServices from "@/services/event.services";
import { addToast } from "@heroui/toast";
import { useMutation } from "@tanstack/react-query";

const useDeleteEventModal = () => {
  const deleteEvent = async (id: string) => {
    const res = await eventServices.deleteEvent(id);

    return res;
  };

  const {
    mutate: mutateDeleteEvent,
    isPending: isPendingMutateDeleteEvent,
    isSuccess: isSuccessDeleteEvent,
  } = useMutation({
    mutationFn: deleteEvent,
    onError: (error) => {
      addToast({
        title: error?.message || "Failed to delete event",
        variant: "bordered",
        color: "danger",
        timeout: 3000,
      });
    },
    onSuccess: () => {
      addToast({
        title: "Event deleted successfully",
        variant: "bordered",
        color: "success",
        timeout: 3000,
      });
    },
  });

  return {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessDeleteEvent,
  };
};

export default useDeleteEventModal;
