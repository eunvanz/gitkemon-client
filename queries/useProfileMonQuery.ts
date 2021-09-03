import { useQuery, UseQueryOptions } from "react-query";
import { ProfileMon, QUERY_KEY } from "~/types";
import api from "../api";

const useProfileMonQuery = (
  userId: string,
  queryOptions?: UseQueryOptions<ProfileMon>,
) => {
  const query = useQuery<ProfileMon>(
    [QUERY_KEY.PROFILE_MON, userId],
    () => api.getProfileMons(userId),
    {
      cacheTime: Infinity,
      staleTime: 1000 * 60 * 5,
      ...queryOptions,
    },
  );
  return query;
};

export default useProfileMonQuery;
