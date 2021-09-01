import { UseInfiniteQueryOptions } from "react-query";
import { Pageable, QUERY_KEY, User } from "~/types";
import api from "../api";
import useCommonInfiniteQuery from "./useCommonInfiniteQuery";

const useUserCollectionRankingListQuery = (
  queryOptions?: UseInfiniteQueryOptions<Pageable<User>>,
) => {
  const query = useCommonInfiniteQuery<User>(
    QUERY_KEY.USER_CONTRIBUTIONS_RANKING,
    api.getUserContributionsRanking,
    queryOptions,
  );
  return query;
};

export default useUserCollectionRankingListQuery;
