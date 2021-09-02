import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEY, UserProfile } from "~/types";
import api from "../api";

const useUserProfileQuery = (
  userId: string,
  queryOptions?: UseQueryOptions<UserProfile>,
) => {
  const query = useQuery(
    [QUERY_KEY.USER_PROFILE, userId],
    () => api.getUserProfile(userId),
    {
      cacheTime: Infinity,
      staleTime: 1000 * 60 * 5,
      ...queryOptions,
    },
  );
  return query;
};

export default useUserProfileQuery;
