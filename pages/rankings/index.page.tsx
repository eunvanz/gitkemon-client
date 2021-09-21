import Head from "next/head";
import withBaseLayout from "~/hocs/withBaseLayout";
import Rankings from "./Rankings.view";
import useRankingsProps from "./useRankingsProps";

const RankingsPage: React.FC<void> = () => {
  const props = useRankingsProps();

  return (
    <>
      <Head>
        <title>Rankings - Gitkémon</title>
      </Head>
      <Rankings {...props} />
    </>
  );
};

export default withBaseLayout(RankingsPage);
