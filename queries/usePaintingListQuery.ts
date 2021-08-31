import { UseInfiniteQueryOptions } from "react-query";
import { Pageable, Painting, QUERY_KEY } from "~/types";
import api from "../api";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

const usePaintingListQuery = (
  queryOptions?: UseInfiniteQueryOptions<Pageable<Painting>>,
) => {
  const query = useCommonInfiniteQuery<Painting>(
    QUERY_KEY.PAINTING_LIST,
    api.getPaintingList,
    queryOptions,
  );
  return query;
};

export default usePaintingListQuery;
