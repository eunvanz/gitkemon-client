import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { MonImage, QUERY_KEY } from "../types";

export interface UseMonImageQueryOptions {
  condition: "monName" | "designerName";
  value: string;
}

const useMonImagesQuery = (
  options: UseMonImageQueryOptions,
  queryOptions?: UseQueryOptions<MonImage[]>,
) => {
  const query = useQuery<MonImage[]>(
    QUERY_KEY.MON_IMAGES,
    () => api.getMonImages(options.condition, options.value),
    queryOptions,
  );
  return query;
};

export default useMonImagesQuery;
