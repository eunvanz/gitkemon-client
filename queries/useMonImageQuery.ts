import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { MonImage, QUERY_KEY } from "../types";

const useMonImageQuery = (
  monImageId: number,
  queryOptions?: UseQueryOptions<MonImage>,
) => {
  const result = useQuery<MonImage>(
    [QUERY_KEY.MON_IMAGE, monImageId],
    () => api.getMonImage(monImageId),
    {
      cacheTime: 0,
      staleTime: 0,
      ...queryOptions,
    },
  );
  return result;
};

export default useMonImageQuery;
