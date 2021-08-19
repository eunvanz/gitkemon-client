import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { Collection, QUERY_KEY } from "../types";

const useCollectionsQuery = (
  userId: string,
  queryOptions?: UseQueryOptions<Collection[]>,
) => {
  const query = useQuery<Collection[]>(
    [QUERY_KEY.COLLECTIONS, userId],
    () => api.getUserCollections(userId),
    queryOptions,
  );
  return query;
};

export default useCollectionsQuery;
