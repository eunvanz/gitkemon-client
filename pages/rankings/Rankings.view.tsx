import { useCallback, useState } from "react";
import Tabs from "~/components/Tabs";
import Typography from "~/components/Typography";

export interface RankingsProps {
  initialTabIndex: number;
}

const Rankings: React.FC<RankingsProps> = ({
  initialTabIndex
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const onChangeTab = useCallback((index: number) => {
    setActiveTabIndex(index)
  }, []);

  return (
    <div className="content-container max-w-screen-xl m-auto p-1 sm:p-4">
      <Typography as="h1" size="2xl">
        Rankings
      </Typography>
      <Tabs 
        labels={[
          {
            name: "Collection ranking"
          },
          {
            name: "Pokemon ranking"
          },
          {
            name: "Contribution ranking"
          },
        ]}
        activeIndex={activeTabIndex}
        onChange={onChangeTab}
      />
      {
        activeTabIndex === 2 &&
      }
    </div>
  );
};

export default Rankings
