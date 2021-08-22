import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../../api";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import ROUTES from "../../paths";
import useNextMonsQuery from "../../queries/useNextMonsQuery";
import { evolveMonState } from "../../state/evolveMon";
import { userState } from "../../state/user";
import { HuntResult } from "../../types";
import { EvolutionProps } from "./Evolution.view";

const useEvolutionProps: () => EvolutionProps = () => {
  const [evolveMon, setEvolveMon] = useRecoilState(evolveMonState);

  const user = useRecoilValue(userState);

  const router = useRouter();

  assertNotEmpty(user);
  assertNotEmpty(evolveMon);

  const { data: nextMons } = useNextMonsQuery(evolveMon!.monId);

  const [result, setResult] = useState<HuntResult | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (nextMons && nextMons.length === 1) {
        const evolutionResult = await api.evolve({
          collectionId: evolveMon.id,
          monId: nextMons[0].id,
        });
        setResult(evolutionResult);
      }
    })();
  }, [evolveMon?.id, nextMons]);

  const onSelectNextMon = useCallback(
    async (monId: number) => {
      const evolutionResult = await api.evolve({ collectionId: evolveMon.id, monId });
      setResult(evolutionResult);
    },
    [evolveMon.id],
  );

  const onNavigateToMyCollection = useCallback(() => {
    router.replace(`${ROUTES.COLLECTIONS}/${user.id}`);
  }, [router, user.id]);

  useEffect(() => {
    return () => {
      setEvolveMon(undefined);
    };
  }, [setEvolveMon]);

  return {
    evolveMon,
    nextMons,
    result,
    onSelectNextMon,
    onNavigateToMyCollection,
  };
};

export default useEvolutionProps;
