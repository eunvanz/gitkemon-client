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
    return pokeBalls.find((pokeBall) => pokeBall.type === huntResult.pokeBallType)!
      .amount;
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

  const onGoToCollections = useCallback(() => {
    // TODO: 콜렉션 페이지 생성 이후 작성
  }, []);

  return {
    pokeBallType: huntResult.pokeBallType,
    result: huntResult.result,
    restPokeBalls,
    onChoosePokeBall,
    onKeepHunting,
    onGoToCollections,
  };
};

export default useHuntResultProps;
