import { useRecoilValue } from "recoil";
import useAvailableContributionsQuery from "~/queries/useAvailableContributionsQuery";
import useLastPaybackQuery from "~/queries/useLastPaybackQuery";
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

  return {
    availableContributions,
    lastPayback,
    user,
  };
};

export default useHomeProps;
