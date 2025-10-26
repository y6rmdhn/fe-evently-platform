import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useEvent = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("");
  const { currentLimit, currentSearch, currentPage } = useChangeUrl();

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await eventServices.getEvents(params);

    const { data } = res;
    console.log(data);

    return data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refetchEvent,
  } = useQuery({
    queryKey: ["events", currentLimit, currentPage, currentSearch],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    currentPage,
    currentLimit,
    currentSearch,
    refetchEvent,
    selectedId,
    setSelectedId,
  };
};

export default useEvent;
