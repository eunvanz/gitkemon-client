import { useQuery, UseQueryOptions } from "react-query";
import api from "../api";
import { QUERY_KEY, User } from "../types";

const useUserQuery = (queryOptions?: UseQueryOptions<User | null>) => {
  const query = useQuery<User | null>(QUERY_KEY.USER, () => api.loginWithToken(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    ...queryOptions,
  });
  return query;
};

export default useUserQuery;
