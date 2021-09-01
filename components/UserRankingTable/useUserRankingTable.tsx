import useList from "~/hooks/useList";
import useUserCollectionRankingListQuery from "~/queries/useUserCollectionRankingListQuery";
import useUserContributionsRankingListQuery from "~/queries/useUserContributionsRankingListQuery";
import { UserRankingTableContainerProps } from ".";
import { UserRankingTableProps } from "./UserRankingTable";

const useUserRankingTable: (
  props: UserRankingTableContainerProps,
) => UserRankingTableProps = ({ type }) => {
  const { data: users, hasNextPage, fetchNextPage: onFetchNextPage } = useList(
    type === "collection"
      ? useUserCollectionRankingListQuery
      : useUserContributionsRankingListQuery,
  );

  return {
    users,
    hasNextPage,
    onFetchNextPage,
  };
};

export default useUserRankingTable;
