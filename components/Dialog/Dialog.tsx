import { useCallback } from "react";
import BaseModal from "../BaseModal";
import Button from "../Button";

export interface DialogProps {
  title?: string;
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: VoidFunction;
  onCancel?: VoidFunction;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  children,
  isOpen,
  onClose,
  okText = "OK",
  onOk,
  cancelText = "Cancel",
  onCancel,
}) => {
  const handleOnOk = useCallback(() => {
    onOk?.();
    onClose();
  }, [onClose, onOk]);

  const handleOnCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <div className="text-right">
          {onCancel && (
            <Button color="white" onClick={handleOnCancel} className="mr-2">
              {cancelText}
            </Button>
          )}
          <Button color="primary" onClick={handleOnOk}>
            {okText}
          </Button>
        </div>
      }
    >
      {children}
    </BaseModal>
  );
};

export default Dialog;
