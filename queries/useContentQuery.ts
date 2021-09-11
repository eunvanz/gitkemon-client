import { useQuery, UseQueryOptions } from "react-query";
import { Content, QUERY_KEY } from "~/types";
import api from "../api";

const useContentQuery = (id: number, queryOptions?: UseQueryOptions<Content>) => {
  const query = useQuery<Content>(QUERY_KEY.CONTENT, () => api.getContent(id), {
    ...queryOptions,
  });
  return query;
};

export default useContentQuery;
