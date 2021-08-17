import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Mon, QUERY_KEY } from "../types";

export interface UseMonsQueryOptions {
  isWithImages: boolean;
}

const useMonsQuery = (
  options?: UseMonsQueryOptions,
  queryOptions?: UseQueryOptions<Mon[]>,
) => {
  const isWithImages = options?.isWithImages;

  const query = useQuery<Mon[]>(
    isWithImages ? QUERY_KEY.MONS_WITH_IMAGES : QUERY_KEY.MONS,
    isWithImages ? api.getAllMonsWithImages : api.getAllMons,
    { cacheTime: Infinity, staleTime: Infinity, ...queryOptions },
  );
  return query;
};

export default useMonsQuery;
