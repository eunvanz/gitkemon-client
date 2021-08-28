import { useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useHuntMutation from "../queries/useHuntMutation";
import useUserQuery from "../queries/useUserQuery";
import { huntResultState } from "../state/huntResult";
import { userState } from "../state/user";
import { PokeBallType } from "../types";

const useHunt = () => {
  useUserQuery({ enabled: true });

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

  const { mutateAsync: hunt } = useHuntMutation();

  const onHunt = useCallback(
    async (pokeBallType: PokeBallType, amount: number) => {
      setHuntResult({ pokeBallType });
      const result = await hunt({ pokeBallType, amount });
      setHuntResult({ pokeBallType, result });
    },
    [hunt, setHuntResult],
  );

  return {
    huntResult,
    pokeBalls,
    onHunt,
  };
};

export default useHunt;
