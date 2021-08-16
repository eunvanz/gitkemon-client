import React from "react";
import MonModal from "./MonModal";
import useMonModalProps from "./useMonModalProps";

export interface MonModalContainerProps {
  isOpen: boolean;
  collectionId: number;
  onClose: VoidFunction;
}

const MonModalContainer: React.FC<MonModalContainerProps> = (
  props: MonModalContainerProps,
) => {
  const monModalProps = useMonModalProps(props);
  return <MonModal {...monModalProps} />;
};

export default MonModalContainer;
