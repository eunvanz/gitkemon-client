import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEY, Mon } from "~/types";
import api from "../api";

const useRecentMonsQuery = (queryOptions?: UseQueryOptions<Mon[]>) => {
  const query = useQuery<Mon[]>(QUERY_KEY.RECENT_MONS, api.getRecentMons, {
    ...queryOptions,
  });
  return query;
};

export default useRecentMonsQuery;
