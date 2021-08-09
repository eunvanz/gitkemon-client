import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import api from "../../api";
import useAvailableContributions from "../../queries/useAvailableContributions";
import useUserQuery from "../../queries/useUserQuery";
import { userState } from "../../state/user";
import { Payback } from "../../types";
import { PaybackProps } from "./Payback.view";

const usePaybackProps: () => PaybackProps = () => {
  const user = useRecoilValue(userState);

  const { refetch } = useUserQuery();

  const {
    data: availableContributions,
    isFetching: isAvailableContributionsFetching,
  } = useAvailableContributions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [isGettingPayback, setIsDonating] = useState(false);

  const [paybackResult, setPaybackResult] = useState<Payback | undefined>(undefined);

  const onPayback = useCallback(async () => {
    setIsDonating(true);
    try {
      const result = await api.postPaybacks();
      setPaybackResult(result);
    } catch (error) {
      // TODO:
    } finally {
      setIsDonating(false);
    }
  }, []);

  return {
    user: user,
    isLoading: !user || isAvailableContributionsFetching,
    availableContributions,
    onPayback,
    isGettingPayback,
    paybackResult,
  };
};

export default usePaybackProps;
