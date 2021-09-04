import { useQuery } from "react-query";
import { QUERY_KEY, RareNews } from "~/types";
import api from "../api";

const useRecentRareNewsQuery = (queryOptions?: UseQueryOptions<RareNews[]>) => {
  const query = useQuery<RareNews[]>(QUERY_KEY.RECENT_RARE_NEWS, api.getRecentRareNews, {
    ...queryOptions,
  });
  return query;
};

export default useRecentRareNewsQuery;
