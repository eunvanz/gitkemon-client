import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Mon, QUERY_KEY } from "../types";

const useActiveMonsQuery = (queryOptions?: UseQueryOptions<Mon[]>) => {
  const query = useQuery<Mon[]>(QUERY_KEY.ACTIVE_MONS, api.getActiveMons, {
    cacheTime: 60_000 * 60,
    staleTime: 60_000 * 60,
    ...queryOptions,
  });
  return query;
};

export default useActiveMonsQuery;
