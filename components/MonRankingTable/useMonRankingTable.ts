import useList from "~/hooks/useList";
import useMonRankingListQuery from "~/queries/useMonRankingListQuery";
import { MonRankingTableContainerProps } from ".";
import { MonRankingTableProps } from "./MonRankingTable";

const useMonRankingTable: (
  props: MonRankingTableContainerProps,
) => MonRankingTableProps = ({ isPreview }) => {
  const { data: collections, hasNextPage, fetchNextPage } = useList(
    useMonRankingListQuery,
  );

  return {
    collections,
    hasNextPage,
    onFetchNextPage: fetchNextPage,
    isPreview,
  };
};

export default useMonRankingTable;
