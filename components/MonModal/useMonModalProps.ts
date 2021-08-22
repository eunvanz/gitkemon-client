import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { MonModalContainerProps } from ".";
import { assertNotEmpty, capitalize } from "../../helpers/commonHelpers";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import ROUTES from "../../paths";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { evolveMonState } from "../../state/evolveMon";
import Dialog from "../Dialog/Dialog";
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

  const onEvolve = useCallback(async () => {
    assertNotEmpty(mon);
    const levelToDown = mon.level! - mon.evolutionLevel!;
    const content =
      levelToDown === 0
        ? `${capitalize(mon.name)} will disappear. Would you like to evolve?`
        : `${capitalize(
            mon.name,
          )}'s level will be down to ${levelToDown}. Would you like to evolve?`;
    onClose();
    const isConfirmed = await Dialog.confirm({ content });
    if (isConfirmed) {
      setEvolveMon(collection);
      router.push(ROUTES.EVOLUTION);
    } else {
      onOpen();
    }
  }, [collection, mon, onClose, onOpen, router, setEvolveMon]);

  const onBlend = useCallback(() => {}, []);

  return {
    isOpen,
    onClose,
    mon,
    oldMon,
    onEvolve,
    onBlend,
  };
};

export default useMonModalProps;
