import withBaseLayout from "~/hocs/withBaseLayout";
import Rankings from "./Rankings.view";
import useRankingsProps from "./useRankingsProps";

const RankingsPage: React.FC<void> = () => {
  const props = useRankingsProps();

  return <Rankings {...props} />;
};

export default withBaseLayout(RankingsPage);
