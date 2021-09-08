import { useRecoilValue } from "recoil";
import useAvailableContributionsQuery from "~/queries/useAvailableContributionsQuery";
import useLastPaybackQuery from "~/queries/useLastPaybackQuery";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import useRecentMonsQuery from "~/queries/useRecentMonsQuery";
import useRecentRareNewsQuery from "~/queries/useRecentRareNewsQuery";
import useUserQuery from "~/queries/useUserQuery";
import { userState } from "~/state/user";
import { HomeProps } from "./Home.view";

const useHomeProps: () => HomeProps = () => {
  const user = useRecoilValue(userState);

  useUserQuery();
  const { data: availableContributions } = useAvailableContributionsQuery({
    enabled: !!user,
  });
  const { data: lastPayback } = useLastPaybackQuery(undefined, {
    enabled: !!user,
  });
  const { data: newMons } = useRecentMonsQuery();
  const { data: newPaintingList } = usePaintingListQuery();
  const { data: rareNews } = useRecentRareNewsQuery();

  return {
    availableContributions,
    lastPayback,
    user,
    newMons,
    newPaintings: newPaintingList?.pages[0]?.items.slice(0, 3) || [],
    rareNews,
  };
};

export default useHomeProps;
