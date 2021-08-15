import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import api from "../../api";
import ROUTES from "../../paths";
import useUserQuery from "../../queries/useUserQuery";
import { huntResultState } from "../../state/huntResult";
import { userState } from "../../state/user";
import { PokeBallType } from "../../types";
import { HuntProps } from "./Hunt.view";

const useHuntProps: () => HuntProps = () => {
  useUserQuery({ enabled: true });

  const user = useRecoilValue(userState);

  const setHuntResult = useSetRecoilState(huntResultState);

  const router = useRouter();

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

  const onSubmit = useCallback(
    async (pokeBallType: PokeBallType, amount: number) => {
      setHuntResult({ pokeBallType });
      const result = await api.hunt({ pokeBallType, amount });
      setHuntResult({ pokeBallType, result });
    },
    [setHuntResult],
  );

  const onFinish = useCallback(() => {
    router.replace(ROUTES.HUNT_RESULT);
  }, [router]);

  return {
    pokeBalls,
    onSubmit,
    onFinish,
  };
};

export default useHuntProps;
