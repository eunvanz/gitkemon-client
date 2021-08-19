import { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../api";
import useUserQuery from "../queries/useUserQuery";
import { huntResultState } from "../state/huntResult";
import { userState } from "../state/user";
import { PokeBallType } from "../types";

const useHunt = () => {
  const { refetch: refetchUser } = useUserQuery({ enabled: true });

  const [huntResult, setHuntResult] = useRecoilState(huntResultState);

  const user = useRecoilValue(userState);

  const pokeBall = useMemo(() => {
    return user?.__pokeBall__;
  }, [user?.__pokeBall__]);

  const pokeBalls = useMemo(() => {
    const result: { type: PokeBallType; amount: number }[] = [];
    [
      "basic" as const,
      "basicRare" as const,
      "rare" as const,
      "elite" as const,
      "legend" as const,
    ].forEach((type) => {
      const amount = pokeBall?.[`${type}PokeBalls` as keyof typeof pokeBall] as number;
      if (amount) {
        result.push({
          type,
          amount,
        });
      }
    });
    return result;
  }, [pokeBall]);

  const onHunt = useCallback(
    async (pokeBallType: PokeBallType, amount: number) => {
      setHuntResult({ pokeBallType });
      const result = await api.hunt({ pokeBallType, amount });
      await refetchUser();
      setHuntResult({ pokeBallType, result });
    },
    [refetchUser, setHuntResult],
  );

  return {
    huntResult,
    pokeBalls,
    onHunt,
  };
};

export default useHunt;
