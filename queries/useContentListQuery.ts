import { UseInfiniteQueryOptions } from "react-query";
import api from "~/api";
import { Content, ContentType, Pageable, QUERY_KEY } from "~/types";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

const useContentListQuery = (
  options: { type: ContentType; size?: number },
  queryOptions?: UseInfiniteQueryOptions<Pageable<Content>>,
) => {
  const query = useCommonInfiniteQuery<Content>(
    [QUERY_KEY.CONTENT_LIST, options.type],
    (pageOptions) =>
      api.getContents(options.type, { ...pageOptions, limit: options.size }),
    queryOptions,
  );
  return query;
};

export default useContentListQuery;
