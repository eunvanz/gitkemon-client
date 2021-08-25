import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { CollectionsPageProps } from ".";
import Dialog from "../../../components/Dialog";
import ROUTES from "../../../paths";
import useActiveMonsQuery from "../../../queries/useActiveMonsQuery";
import useCollectionsQuery from "../../../queries/useCollectionsQuery";
import { blendMonState } from "../../../state/blendMon";
import { userState } from "../../../state/user";
import { Collection } from "../../../types";
import { CollectionsProps } from "./Collections.view";

const useCollectionsProps: (ssrProps: CollectionsPageProps) => CollectionsProps = ({
  ssrMons,
  ssrCollections,
}) => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const { data: mons } = useActiveMonsQuery({ initialData: ssrMons });
  const { data: collections } = useCollectionsQuery(userId, {
    initialData: ssrCollections,
  });
  const user = useRecoilValue(userState);
  const [blendMon, setBlendMon] = useRecoilState(blendMonState);

  const isBlendMode = useMemo(() => {
    return !!blendMon;
  }, [blendMon]);

  const isMyCollection = useMemo(() => {
    return user && userId === user.id;
  }, [user, userId]);

  const collectionUser = useMemo(() => {
    return isMyCollection ? user : user;
  }, [isMyCollection, user]);

  useEffect(() => {
    return () => {
      setBlendMon((blendMon) => (blendMon?.length === 2 ? blendMon : undefined));
    };
  }, [setBlendMon]);

  const onSelectItem = useCallback(
    async (collection: Collection) => {
      if (isBlendMode) {
        const isConfirmed = await Dialog.confirm({
          title: "Blend",
          content:
            "The level of the selected Pokémon decreases by 1, and if it is a Level 1 Pokémon, it disappears forever. Do you want to proceed?",
        });
        if (isConfirmed) {
          setBlendMon([blendMon![0], collection]);
          router.replace(ROUTES.BLEND);
        }
      }
    },
    [blendMon, isBlendMode, router, setBlendMon],
  );

  const onCancelBlendMode = useCallback(() => {
    setBlendMon(undefined);
  }, [setBlendMon]);

  return {
    collections,
    mons,
    user: collectionUser!,
    isBlendMode,
    monToBlend: blendMon?.[0],
    onSelectItem,
    onCancelBlendMode,
  };
};

export default useCollectionsProps;
