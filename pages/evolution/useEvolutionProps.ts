import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { assertNotEmpty } from "~/helpers/commonHelpers";
import { showEvolutionConfirm } from "~/helpers/tsxHelpers";
import ROUTES from "../../paths";
import useEvolveMutation from "../../queries/useEvolveMutation";
import useNextMonsQuery from "../../queries/useNextMonsQuery";
import { evolveMonState } from "../../state/evolveMon";
import { userState } from "../../state/user";
import { EvolutionProps } from "./Evolution.view";

const useEvolutionProps: () => EvolutionProps = () => {
  const [evolveMon, setEvolveMon] = useRecoilState(evolveMonState);

  const user = useRecoilValue(userState);

  const router = useRouter();

  const { data: nextMons } = useNextMonsQuery(evolveMon!.monId);

  const { mutate: evolve, data: result } = useEvolveMutation();

  useEffect(() => {
    if (!evolveMon) return;
    (async () => {
      if (nextMons && nextMons.length === 1) {
        evolve({
          collectionId: evolveMon.id,
          monId: nextMons[0].id,
        });
      }
    })();
  }, [evolve, evolveMon, nextMons]);

  const onSelectNextMon = useCallback(
    async (monId: number) => {
      if (!evolveMon) return;
      evolve({
        collectionId: evolveMon.id,
        monId,
      });
    },
    [evolve, evolveMon],
  );

  const onNavigateToMyCollection = useCallback(() => {
    if (!user) return;
    router.replace(`${ROUTES.COLLECTIONS}/${user.id}`);
  }, [router, user]);

  useEffect(() => {
    return () => {
      setEvolveMon(undefined);
    };
  }, [setEvolveMon]);

  const onKeepEvolution = useCallback(async () => {
    assertNotEmpty(evolveMon);
    const newEvolveMon = {
      ...evolveMon,
      level: evolveMon.level - evolveMon?.evolutionLevel!,
    };
    const isConfirmed = await showEvolutionConfirm(newEvolveMon);
    if (isConfirmed) {
      setEvolveMon(newEvolveMon);
    }
  }, [evolveMon, setEvolveMon]);

  return {
    evolveMon,
    nextMons,
    result,
    onSelectNextMon,
    onNavigateToMyCollection,
    user,
    onKeepEvolution,
  };
};

export default useEvolutionProps;
