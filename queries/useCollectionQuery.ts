import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Collection, QUERY_KEY } from "../types";

const useCollectionQuery = (id: number, queryOptions: UseQueryOptions<Collection>) => {
  const query = useQuery<Collection>(
    [QUERY_KEY.COLLECTION, id],
    () => api.getCollection(id),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      ...queryOptions,
    },
  );
  return query;
};

export default useCollectionQuery;
