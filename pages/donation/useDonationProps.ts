import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import useAvailableContributions from "../../queries/useAvailableContributions";
import useUserQuery from "../../queries/useUserQuery";
import { userState } from "../../state/user";
import { Donation } from "../../types";
import { DonationProps } from "./Donation.view";

const useDonationProps: () => DonationProps = () => {
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

  const [donationResult, setDonationResult] = useState<Donation | undefined>(undefined);

  const onDonate = useCallback(async () => {
    setIsDonating(true);
    try {
      const result = await api.postDonations();
      setDonationResult(result);
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
    donationResult,
  };
};

export default useDonationProps;
