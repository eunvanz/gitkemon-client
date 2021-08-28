import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { assertNotEmpty } from "../../helpers/commonHelpers";
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

  assertNotEmpty(user);
  assertNotEmpty(evolveMon);

  const { data: nextMons } = useNextMonsQuery(evolveMon!.monId);

  const { mutate: evolve, data: result } = useEvolveMutation();

  useEffect(() => {
    (async () => {
      if (nextMons && nextMons.length === 1) {
        evolve({
          collectionId: evolveMon.id,
          monId: nextMons[0].id,
        });
      }
    })();
  }, [evolve, evolveMon.id, nextMons]);

  const onSelectNextMon = useCallback(
    async (monId: number) => {
      evolve({
        collectionId: evolveMon.id,
        monId,
      });
    },
    [evolve, evolveMon.id],
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
