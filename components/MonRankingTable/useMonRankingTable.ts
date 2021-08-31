import useList from "~/hooks/useList";
import useMonRankingListQuery from "~/queries/useMonRankingListQuery";
import { MonRankingTableProps } from "./MonRankingTable";

const useMonRankingTable: () => MonRankingTableProps = () => {
  const { data: collections, hasNextPage, fetchNextPage } = useList(
    useMonRankingListQuery,
  );

  return {
    collections,
    hasNextPage,
    onFetchNextPage: fetchNextPage,
  };
};

export default useMonRankingTable;
