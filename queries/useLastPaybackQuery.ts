import { useQuery, UseQueryOptions } from "react-query";
import { Payback, QUERY_KEY } from "~/types";
import api from "../api";

const useLastPaybackQuery = (queryOptions?: UseQueryOptions<Payback>) => {
  const query = useQuery<Payback>(QUERY_KEY.LAST_PAYBACK, api.getLastPayback, {
    ...queryOptions,
  });
  return query;
};

export default useLastPaybackQuery;
