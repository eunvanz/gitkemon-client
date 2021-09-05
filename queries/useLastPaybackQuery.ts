import { useQuery, UseQueryOptions } from "react-query";
import { Payback, QUERY_KEY } from "~/types";
import api from "../api";

const useLastPaybackQuery = (
  accessToken?: string,
  queryOptions?: UseQueryOptions<Payback>,
) => {
  const query = useQuery<Payback>(
    QUERY_KEY.LAST_PAYBACK,
    () => api.getLastPayback(accessToken),
    {
      ...queryOptions,
    },
  );
  return query;
};

export default useLastPaybackQuery;
