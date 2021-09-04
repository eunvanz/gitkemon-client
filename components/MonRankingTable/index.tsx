import MonRankingTable from "./MonRankingTable";
import useMonRankingTable from "./useMonRankingTable";

export interface MonRankingTableContainerProps {
  isPreview?: boolean;
}

const MonRankingTableContainer = (containerProps: MonRankingTableContainerProps) => {
  const props = useMonRankingTable(containerProps);

  return <MonRankingTable {...props} />;
};

export default MonRankingTableContainer;
