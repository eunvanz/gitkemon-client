import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery } from "react-query";
import { Collection, Pageable, QUERY_KEY } from "~/types";
import api from "../api";

const useMonRankingListQuery = (
  queryOptions?: UseInfiniteQueryOptions<Pageable<Collection>>,
) => {
  const query = useInfiniteQuery<Pageable<Collection>>(
    QUERY_KEY.MON_RANKING,
    ({ pageParam = 1 }) => api.getMonRanking({ page: pageParam }),
    {
      ...queryOptions,
      getNextPageParam: ({ meta: { totalPages, currentPage } }) =>
        totalPages === currentPage ? undefined : currentPage + 1,
    },
  );
  return query;
};

export default useMonRankingListQuery;
