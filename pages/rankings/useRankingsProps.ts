import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import ROUTES from "~/paths";
import { RankingsProps } from "./Rankings.view";

const useRankingsProps: () => RankingsProps = () => {
  const router = useRouter();

  const { tab } = router.query as { tab: string };

  const tabs = useMemo(() => {
    return ["collection", "contribution", "pokemon"];
  }, []);

  const initialTabIndex = useMemo(() => {
    const index = tabs.indexOf(tab);
    return index > -1 ? index : 0;
  }, [tab, tabs]);

  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);

  const onChangeTab = useCallback(
    (index: number) => {
      router.replace(`${ROUTES.RANKINGS}?tab=${tabs[index]}`);
      setActiveTabIndex(index);
    },
    [router, tabs],
  );

  useEffect(() => {
    router.isReady && setActiveTabIndex(initialTabIndex);
  }, [initialTabIndex, router.isReady]);

  return {
    activeTabIndex,
    onChangeTab,
  };
};

export default useRankingsProps;
