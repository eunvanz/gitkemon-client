import { useRecoilValue } from "recoil";
import useAvailableContributionsQuery from "~/queries/useAvailableContributionsQuery";
import useLastPaybackQuery from "~/queries/useLastPaybackQuery";
import usePaintingListQuery from "~/queries/usePaintingListQuery";
import useRecentMonsQuery from "~/queries/useRecentMonsQuery";
import useRecentRareNewsQuery from "~/queries/useRecentRareNewsQuery";
import useUserQuery from "~/queries/useUserQuery";
import { userState } from "~/state/user";
import { HomeProps } from "./Home.view";
import { HomePageProps } from "./index.page";

const useHomeProps: (pageProps: HomePageProps) => HomeProps = ({
  ssrNewMons,
  ssrNewPaintingList,
  ssrLastPayback,
  ssrAvailableContributions,
  ssrRareNews,
}) => {
  const user = useRecoilValue(userState);

  useUserQuery();
  const { data: availableContributions } = useAvailableContributionsQuery({
    enabled: !!user && !ssrAvailableContributions,
    initialData: ssrAvailableContributions,
  });
  const { data: lastPayback } = useLastPaybackQuery(undefined, {
    enabled: !!user && !ssrLastPayback,
    initialData: ssrLastPayback,
  });
  const { data: newMons } = useRecentMonsQuery({
    enabled: !ssrNewMons,
    initialData: ssrNewMons,
  });
  const { data: newPaintingList } = usePaintingListQuery({
    enabled: !ssrNewPaintingList,
  });
  const { data: rareNews } = useRecentRareNewsQuery({
    enabled: !ssrRareNews,
    initialData: ssrRareNews,
  });

  return {
    availableContributions,
    lastPayback,
    user,
    newMons,
    newPaintings: newPaintingList?.pages[0].items.slice(0, 3) || ssrNewPaintingList.items,
    rareNews,
  };
};

export default useHomeProps;
