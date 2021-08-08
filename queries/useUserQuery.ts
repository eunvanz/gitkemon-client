import { useQuery, UseQueryOptions } from "react-query";
import { useSetRecoilState } from "recoil";
import api from "../api";
import { userState } from "../state/user";
import { QUERY_KEY, User } from "../types";

const useUserQuery = (queryOptions?: UseQueryOptions<User | null>) => {
  const setUserState = useSetRecoilState(userState);

  const query = useQuery<User | null>(QUERY_KEY.USER, () => api.loginWithToken(), {
    cacheTime: Infinity,
    staleTime: Infinity,
    onSuccess: (data) => setUserState(data || undefined),
    ...queryOptions,
  });
  return query;
};

export default useUserQuery;
