import { MonModalProps } from "./MonModal";

export interface UseMonModalPropsOptions {
  isOpen: boolean;
  onClose: VoidFunction;
  collectionId: number;
}

const useMonModalProps: (options: UseMonModalPropsOptions) => MonModalPropsProps = ({
  isOpen,
  onClose,
  collectionId,
}) => {
  return {
    isOpen,
  };
};

export default useMonModalProps;
