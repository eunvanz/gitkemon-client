import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Mon, QUERY_KEY } from "../types";

const useMonQuery = (monId?: number, queryOptions?: UseQueryOptions<Mon | undefined>) => {
  const query = useQuery<Mon | undefined>(
    QUERY_KEY.MON,
    monId ? () => api.getMonById(monId) : () => undefined,
    queryOptions,
  );
  return query;
};

export default useMonQuery;
