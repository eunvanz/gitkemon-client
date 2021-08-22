import { useCallback, useEffect, useState } from "react";
import { unmountComponentAtNode, render } from "react-dom";
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

const Dialog = ({
  title,
  children,
  isOpen,
  onClose,
  okText = "OK",
  onOk,
  cancelText = "Cancel",
  onCancel,
}: DialogProps) => {
  const handleOnOk = useCallback(() => {
    (onOk || onClose)();
  }, [onClose, onOk]);

  const handleOnCancel = useCallback(() => {
    (onCancel || onClose)();
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

export type DialogAlertPromiseProps = Omit<
  DialogProps,
  "isOpen" | "onClose" | "children" | "onCancel" | "cancelText" | "onOk"
> & {
  content: React.ReactNode;
};

export type DialogConfirmPromiseProps = Omit<
  DialogProps,
  "isOpen" | "onClose" | "children" | "onCancel" | "onOk"
> & {
  content: React.ReactNode;
};

function promiseDialog(props: DialogAlertPromiseProps): Promise<undefined>;
function promiseDialog(props: DialogConfirmPromiseProps): Promise<boolean>;
function promiseDialog({
  okText,
  content,
  cancelText,
}: DialogAlertPromiseProps & Partial<DialogConfirmPromiseProps>) {
  const isConfirm = cancelText !== undefined;

  return new Promise((resolve) => {
    const fragment = new DocumentFragment();

    const DialogContainer = () => {
      const [isVisible, setIsVisible] = useState(false);

      const onClose = (isConfirmed?: boolean) => {
        setIsVisible(false);
        resolve(isConfirmed);
        setTimeout(() => {
          unmountComponentAtNode(fragment);
        }, 300);
      };

      useEffect(() => {
        setIsVisible(true);
      }, []);

      return isConfirm ? (
        <Dialog
          isOpen={isVisible}
          okText={okText}
          cancelText={cancelText}
          onClose={() => onClose(undefined)}
          onCancel={() => onClose(false)}
          onOk={() => onClose(true)}
        >
          {content}
        </Dialog>
      ) : (
        <Dialog isOpen={isVisible} okText={okText} onClose={() => onClose(undefined)}>
          {content}
        </Dialog>
      );
    };

    render(<DialogContainer />, fragment);
  });
}

Dialog.confirm = (props: DialogConfirmPromiseProps) =>
  promiseDialog({ ...props, cancelText: props.cancelText || "Cancel" });

Dialog.show = (props: DialogAlertPromiseProps) => promiseDialog(props);

export default Dialog;
