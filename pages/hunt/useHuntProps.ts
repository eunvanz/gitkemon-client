import { useCallback, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import useUserQuery from "../../queries/useUserQuery";
import { userState } from "../../state/user";
import { PokeBallType } from "../../types";
import { HuntProps } from "./Hunt.view";

const useHuntProps: () => HuntProps = () => {
  useUserQuery({ enabled: true });

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

  const onSubmit = useCallback((type: PokeBallType, amount: number) => {}, []);

  return {
    pokeBalls,
    onSubmit,
  };
};

export default useHuntProps;
