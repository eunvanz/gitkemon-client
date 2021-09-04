import useList from "~/hooks/useList";
import useUserCollectionRankingListQuery from "~/queries/useUserCollectionRankingListQuery";
import useUserContributionsRankingListQuery from "~/queries/useUserContributionsRankingListQuery";
import { UserRankingTableContainerProps } from ".";
import { UserRankingTableProps } from "./UserRankingTable";

const useUserRankingTable: (
  props: UserRankingTableContainerProps,
) => UserRankingTableProps = ({ type, isPreview }) => {
  const { data: users, hasNextPage, fetchNextPage: onFetchNextPage } = useList(
    type === "collection"
      ? useUserCollectionRankingListQuery
      : useUserContributionsRankingListQuery,
  );

  return {
    users,
    hasNextPage,
    onFetchNextPage,
    isPreview,
    type,
  };
};

export default useUserRankingTable;
