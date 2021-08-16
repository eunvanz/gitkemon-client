import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { QUERY_KEY } from "../types";

const useCollectionQuery = (id: number, queryOptions: UseQueryOptions) => {
  const query = useQuery([QUERY_KEY.COLLECTION, id], () => api.getCollection(id), {
    cacheTime: Infinity,
    staleTime: 15_000,
    ...queryOptions,
  });
  return query;
};

export default useCollectionQuery;
