import { useMemo } from "react";
import { MonModalContainerProps } from ".";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { MonModalProps } from "./MonModal";

const useMonModalProps: (options: MonModalContainerProps) => MonModalProps = ({
  isOpen,
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

  return {
    isOpen,
    onClose,
    mon,
    oldMon,
  };
};

export default useMonModalProps;
