import MonRankingTable from "./MonRankingTable";
import useMonRankingTable from "./useMonRankingTable";

const MonRankingTableContainer = () => {
  const props = useMonRankingTable();

  return <MonRankingTable {...props} />;
};

export default MonRankingTableContainer;
