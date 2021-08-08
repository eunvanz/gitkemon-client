import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import useAvailableContributions from "../../queries/useAvailableContributions";
import useUserQuery from "../../queries/useUserQuery";
import { userState } from "../../state/user";
import { Payback } from "../../types";
import { PaybackProps } from "./Payback.view";

const usePaybackProps: () => PaybackProps = () => {
  const [user, setUser] = useRecoilState(userState);

  const { refetch } = useUserQuery({
    onSuccess: (data) => setUser(data || undefined),
  });

  const {
    data: availableContributions,
    isFetching: isAvailableContributionsFetching,
  } = useAvailableContributions();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [isDonating, setIsDonating] = useState(false);

  const [paybackResult, setPaybackResult] = useState<Payback | undefined>(undefined);

  const onDonate = useCallback(async () => {
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
    onDonate,
    isDonating,
    paybackResult,
  };
};

export default usePaybackProps;
