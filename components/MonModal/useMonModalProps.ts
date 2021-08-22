import { useCallback, useMemo } from "react";
import { MonModalContainerProps } from ".";
import { assertNotEmpty, capitalize } from "../../helpers/commonHelpers";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import useCollectionQuery from "../../queries/useCollectionQuery";
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
    enabled: !newMon && isOpen,
  });

  const mon = useMemo(() => {
    return newMon || (collection ? convertCollectionToModalMon(collection) : undefined);
  }, [collection, newMon]);

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
    } else {
      onOpen();
    }
  }, [mon, onClose, onOpen]);

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
