import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { Pageable, Painting, QUERY_KEY } from "~/types";
import api from "../api";

const usePaintingListQuery = (
  queryOptions?: UseInfiniteQueryOptions<Pageable<Painting>>,
) => {
  const query = useInfiniteQuery<Pageable<Painting>>(
    QUERY_KEY.PAINTING_LIST,
    ({ pageParam = 1 }) => api.getAllPaintings({ page: pageParam }),
    {
      ...queryOptions,
      getNextPageParam: ({ meta: { totalPages, currentPage } }) =>
        totalPages === currentPage ? undefined : currentPage + 1,
    },
  );
  return query;
};

export default usePaintingListQuery;
