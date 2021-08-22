import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Mon, QUERY_KEY } from "../types";

const useNextMonsQuery = (monId: number, queryOptions?: UseQueryOptions<Mon[]>) => {
  const query = useQuery<Mon[]>([QUERY_KEY.NEXT_MONS], () => api.getNextMons(monId), {
    cacheTime: 60 * 60_000 * 24,
    staleTime: 60 * 60_000 * 24,
    ...queryOptions,
  });
  return query;
};

export default useNextMonsQuery;
