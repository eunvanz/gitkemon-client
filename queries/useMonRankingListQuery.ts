import { UseInfiniteQueryOptions } from "react-query";
import { Collection, Pageable, QUERY_KEY } from "~/types";
import api from "../api";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

const useMonRankingListQuery = (
  queryOptions?: UseInfiniteQueryOptions<Pageable<Collection>>,
) => {
  const query = useCommonInfiniteQuery<Collection>(
    QUERY_KEY.MON_RANKING,
    api.getMonRanking,
    queryOptions,
  );
  return query;
};

export default useMonRankingListQuery;
