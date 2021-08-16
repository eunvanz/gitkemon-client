import React from "react";
import { ModalMon } from "../../types";
import MonModal from "./MonModal";
import useMonModalProps from "./useMonModalProps";

export interface MonModalContainerProps {
  isOpen: boolean;
  collectionId: number;
  onClose: VoidFunction;
  oldMon?: ModalMon;
}

const MonModalContainer: React.FC<MonModalContainerProps> = (
  props: MonModalContainerProps,
) => {
  const monModalProps = useMonModalProps(props);
  return <MonModal {...monModalProps} />;
};

export default MonModalContainer;
