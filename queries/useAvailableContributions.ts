import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { QUERY_KEY } from "../types";

const useAvailableContributions = (options?: UseQueryOptions<number>) => {
  const query = useQuery<number>(
    QUERY_KEY.AVAILABLE_CONTRIBUTIONS,
    api.getAvailableContributions,
    {
      ...options,
    },
  );
  return query;
};

export default useAvailableContributions;
