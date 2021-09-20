import { useQuery, UseQueryOptions } from "react-query";
import { QUERY_KEY } from "~/types";
import api from "../api";

const useReferredCountQuery = (queryOptions?: UseQueryOptions<number>) => {
  const query = useQuery<number>(QUERY_KEY.REFERRED_COUNT, api.getReferredCount, {
    ...queryOptions,
  });
  return query;
};

export default useReferredCountQuery;
