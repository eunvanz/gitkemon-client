import { useQuery, UseQueryOptions } from "react-query";
import { PaybackLog, QUERY_KEY } from "~/types";
import api from "../api";

const usePaybackHistoryQuery = (
  userId: string,
  queryOptions?: UseQueryOptions<PaybackLog[]>,
) => {
  const query = useQuery<PaybackLog[]>(
    [QUERY_KEY.PAYBACK_HISTORY, userId],
    () => api.getPaybackHistory(userId),
    {
      cacheTime: Infinity,
      staleTime: 1000 * 60 * 60,
      ...queryOptions,
    },
  );
  return query;
};

export default usePaybackHistoryQuery;
