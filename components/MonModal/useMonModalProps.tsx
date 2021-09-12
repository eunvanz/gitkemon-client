import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { showEvolutionConfirm } from "~/helpers/tsxHelpers";
import { MonModalContainerProps } from ".";
import { assertNotEmpty } from "../../helpers/commonHelpers";
import {
  checkIsCollectionMaxLevel,
  convertCollectionToModalMon,
} from "../../helpers/projectHelpers";
import ROUTES from "../../paths";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { blendMonState } from "../../state/blendMon";
import { evolveMonState } from "../../state/evolveMon";
import { userState } from "../../state/user";
import { MonModalProps } from "./MonModal";

const useMonModalProps: (options: MonModalContainerProps) => MonModalProps = ({
  isOpen,
  onOpen,
  onClose,
  collectionId,
  oldMon,
  newMon,
}) => {
  const { data: collection } = useCollectionQuery(collectionId, {
    enabled: isOpen,
  });

  const mon = useMemo(() => {
    return newMon || (collection ? convertCollectionToModalMon(collection) : undefined);
  }, [collection, newMon]);

  const router = useRouter();

  const setEvolveMon = useSetRecoilState(evolveMonState);
  const [blendMon, setBlendMon] = useRecoilState(blendMonState);
  const user = useRecoilValue(userState);

  const onEvolve = useCallback(async () => {
    assertNotEmpty(collection);
    onClose();
    const isConfirmed = await showEvolutionConfirm(collection);
    if (isConfirmed) {
      setEvolveMon(collection);
      router.push(ROUTES.EVOLUTION);
    } else {
      onOpen();
    }
  }, [collection, onClose, onOpen, router, setEvolveMon]);

  const onBlend = useCallback(async () => {
    collection && setBlendMon([collection]);
    onClose();
    router.push(`${ROUTES.COLLECTIONS}/${user!.id}`);
  }, [collection, onClose, router, setBlendMon, user]);

  const isBlendHidden = useMemo(() => {
    return !!blendMon;
  }, [blendMon]);

  const isOwned = useMemo(() => {
    return (!!mon?.userId && user?.id === mon.userId) || !!newMon;
  }, [mon?.userId, newMon, user?.id]);

  const isMaxLevel = useMemo(() => {
    return user && isOwned && mon ? checkIsCollectionMaxLevel(user, mon) : false;
  }, [isOwned, mon, user]);

  return {
    isOpen,
    onClose,
    mon,
    oldMon,
    onEvolve,
    onBlend,
    isBlendHidden,
    isOwned,
    isMaxLevel,
  };
};

export default useMonModalProps;
