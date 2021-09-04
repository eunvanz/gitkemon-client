import { useCallback, useState } from "react";
import MonRankingTableContainer from "~/components/MonRankingTable";
import Tabs from "~/components/Tabs";
import Typography from "~/components/Typography";
import UserRankingTableContainer from "~/components/UserRankingTable";

export interface RankingsProps {
  activeTabIndex: number;
  onChangeTab: (index: number) => void;
}

const Rankings: React.FC<RankingsProps> = ({ activeTabIndex, onChangeTab }) => {
  return (
    <div className="content-container-no-footer max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        Rankings
      </Typography>
      <Tabs
        labels={[
          {
            name: "Collection",
          },
          {
            name: "Contribution",
          },
          {
            name: "Pokemon",
          },
        ]}
        activeIndex={activeTabIndex}
        onChange={onChangeTab}
      />
      <div className="mt-4">
        {activeTabIndex === 0 && <UserRankingTableContainer type="collection" />}
        {activeTabIndex === 1 && <UserRankingTableContainer type="contributions" />}
        {activeTabIndex === 2 && <MonRankingTableContainer />}
      </div>
    </div>
  );
};

export default Rankings;
