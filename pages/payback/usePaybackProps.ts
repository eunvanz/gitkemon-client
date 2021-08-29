import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { PaybackPageProps } from ".";
import api from "../../api";
import ROUTES from "../../paths";
import useAvailableContributionsQuery from "../../queries/useAvailableContributionsQuery";
import useUserQuery from "../../queries/useUserQuery";
import { userState } from "../../state/user";
import { Payback } from "../../types";
import { PaybackProps } from "./Payback.view";

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

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  const [isGettingPayback, setIsGettingPayback] = useState(false);

  const [paybackResult, setPaybackResult] = useState<Payback | undefined>(undefined);

  const onPayback = useCallback(async () => {
    setIsGettingPayback(true);
    try {
      const result = await api.postPaybacks();
      setPaybackResult(result);
      refetchAvailableContributions();
      refetchUser();
    } catch (error) {
      // TODO:
    } finally {
      setIsGettingPayback(false);
    }
  }, [refetchAvailableContributions, refetchUser]);

  const onRefresh = useCallback(() => {
    refetchUser();
    refetchAvailableContributions();
    setPaybackResult(undefined);
  }, [refetchAvailableContributions, refetchUser]);

  const onGetPokemons = useCallback(() => {
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
    onGetPokemons,
  };
};

export default usePaybackProps;
