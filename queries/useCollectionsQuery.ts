import { useQuery, UseQueryOptions } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "~/state/user";
import api from "../api";
import { Collection, QUERY_KEY } from "../types";

const useCollectionsQuery = (
  userId: string,
  queryOptions?: UseQueryOptions<Collection[]>,
) => {
  const user = useRecoilValue(userState);

  const query = useQuery<Collection[]>(
    [QUERY_KEY.COLLECTIONS, userId],
    () => api.getUserCollections(userId),
    {
      cacheTime: Infinity,
      staleTime: user?.id === userId ? 1000 * 60 * 10 : 0,
      ...queryOptions,
    },
  );
  return query;
};

export default useCollectionsQuery;
