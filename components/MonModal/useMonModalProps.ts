import { useMemo } from "react";
import { convertCollectionToModalMon } from "../../helpers/projectHelpers";
import useCollectionQuery from "../../queries/useCollectionQuery";
import { MonModalProps } from "./MonModal";

export interface UseMonModalPropsOptions {
  isOpen: boolean;
  onClose: VoidFunction;
  collectionId: number;
}

const useMonModalProps: (options: UseMonModalPropsOptions) => MonModalProps = ({
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
