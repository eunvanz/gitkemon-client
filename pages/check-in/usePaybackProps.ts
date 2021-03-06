import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import ROUTES from "~/paths";
import useAvailableContributionsQuery from "~/queries/useAvailableContributionsQuery";
import usePaybackMutation from "~/queries/usePaybackMutation";
import useUserQuery from "~/queries/useUserQuery";
import { userState } from "~/state/user";
import { Payback } from "~/types";
import { PaybackProps } from "./Payback.view";
import { PaybackPageProps } from "./index.page";

const usePaybackProps: (props: PaybackPageProps) => PaybackProps = ({
  ssrAvailableContributions,
  ssrUser,
}) => {
  const stateUser = useRecoilValue(userState);

  const router = useRouter();

  const { refetch: refetchUser } = useUserQuery({
    enabled: !ssrUser,
    initialData: ssrUser,
  });

  const {
    data: availableContributions,
    isFetching: isAvailableContributionsFetching,
    refetch: refetchAvailableContributions,
  } = useAvailableContributionsQuery({
    enabled: !ssrAvailableContributions,
    initialData: ssrAvailableContributions,
  });

  const { mutateAsync: payback, isLoading: isGettingPayback } = usePaybackMutation();

  const [paybackResult, setPaybackResult] = useState<Payback | undefined>(undefined);

  const onPayback = useCallback(async () => {
    const result = await payback();
    setPaybackResult(result);
  }, [payback]);

  const onRefresh = useCallback(() => {
    refetchUser();
    refetchAvailableContributions();
    setPaybackResult(undefined);
  }, [refetchAvailableContributions, refetchUser]);

  const onGetPokémons = useCallback(() => {
    router.push(ROUTES.HUNT);
  }, [router]);

  const user = useMemo(() => {
    return ssrUser || stateUser;
  }, [ssrUser, stateUser]);

  return {
    user,
    isLoading: !user || isAvailableContributionsFetching,
    availableContributions,
    onPayback,
    isGettingPayback,
    paybackResult,
    onRefresh,
    onGetPokémons,
  };
};

export default usePaybackProps;
