import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { QUERY_KEY } from "../types";

const useAvailableContributionsQuery = (options?: UseQueryOptions<number>) => {
  const query = useQuery<number>(
    QUERY_KEY.AVAILABLE_CONTRIBUTIONS,
    () => api.getAvailableContributions(),
    {
      cacheTime: Infinity,
      staleTime: 60 * 1000 * 10,
      ...options,
    },
  );
  return query;
};

export default useAvailableContributionsQuery;
