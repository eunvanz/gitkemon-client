import { useRecoilValue } from "recoil";
import useAvailableContributionsQuery from "~/queries/useAvailableContributionsQuery";
import useLastPaybackQuery from "~/queries/useLastPaybackQuery";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import useRecentMonsQuery from "~/queries/useRecentMonsQuery";
import useUserQuery from "~/queries/useUserQuery";
import { userState } from "~/state/user";
import { HomeProps } from "./Home.view";

const useHomeProps: () => HomeProps = () => {
  const user = useRecoilValue(userState);

  useUserQuery();
  const { data: availableContributions } = useAvailableContributionsQuery({
    enabled: !!user,
  });
  const { data: lastPayback } = useLastPaybackQuery({ enabled: !!user });
  const { data: newMons } = useRecentMonsQuery();
  const { data: newPaintingList } = usePaintingListQuery();

  return {
    availableContributions,
    lastPayback,
    user,
    newMons,
    newPaintings: newPaintingList?.pages[0].items.slice(0, 3),
  };
};

export default useHomeProps;
