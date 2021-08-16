import { useMemo } from "react";
import { MonModalContainerProps } from ".";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { MonModalProps } from "./MonModal";

const useMonModalProps: (options: MonModalContainerProps) => MonModalProps = ({
  isOpen,
  onClose,
  collectionId,
}) => {
  const { data: collection } = useCollectionQuery(collectionId, { enabled: isOpen });

  const mon = useMemo(() => {
    return collection ? convertCollectionToModalMon(collection) : undefined;
  }, [collection]);

  return {
    isOpen,
    onClose,
    mon,
  };
};

export default useMonModalProps;
