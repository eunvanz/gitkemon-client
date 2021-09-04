import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "~/state/user";
import useHunt from "../../hooks/useHunt";
import ROUTES from "../../paths";
import { HuntResultViewProps } from "./HuntResult.view";

const useHuntResultProps: () => HuntResultViewProps = () => {
  const { huntResult, pokeBalls, onHunt } = useHunt();

  const user = useRecoilValue(userState);

  const router = useRouter();

  const restPokeBalls = useMemo(() => {
    if (!huntResult) return 0;
    return (
      pokeBalls.find((pokeBall) => pokeBall.type === huntResult.pokeBallType)?.amount || 0
    );
  }, [huntResult, pokeBalls]);

  const onChoosePokeBall = useCallback(() => {
    router.replace(ROUTES.HUNT);
  }, [router]);

  const onKeepHunting = useCallback(() => {
    if (huntResult) {
      onHunt(
        huntResult.pokeBallType!,
        Math.min(restPokeBalls, huntResult.result!.length),
      );
    }
  }, [huntResult, onHunt, restPokeBalls]);

  return {
    pokeBallType: huntResult?.pokeBallType,
    result: huntResult?.result,
    restPokeBalls,
    onChoosePokeBall,
    onKeepHunting,
    user,
  };
};

export default useHuntResultProps;
