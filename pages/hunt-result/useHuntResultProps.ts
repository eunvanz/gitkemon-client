import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { HuntResultProps } from "../../components/HuntResult";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import useHunt from "../../hooks/useHunt";
import ROUTES from "../../paths";

const useHuntResultProps: () => HuntResultProps = () => {
  const { huntResult, pokeBalls, onHunt } = useHunt();

  const router = useRouter();

  assertNotEmpty(huntResult?.pokeBallType);

  const restPokeBalls = useMemo(() => {
    return (
      pokeBalls.find((pokeBall) => pokeBall.type === huntResult.pokeBallType)?.amount || 0
    );
  }, [huntResult.pokeBallType, pokeBalls]);

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
    pokeBallType: huntResult.pokeBallType,
    result: huntResult.result,
    restPokeBalls,
    onChoosePokeBall,
    onKeepHunting,
  };
};

export default useHuntResultProps;
