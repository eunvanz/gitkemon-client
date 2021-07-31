import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { ExtendableHTMLProps } from "../../types";

export interface BaseModalProps extends ExtendableHTMLProps<HTMLDivElement> {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
  title?: string;
  isCloseButtonVisible: boolean;
  footer?: React.ReactNode;
}

const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  isCloseButtonVisible,
  footer,
  ...restProps
}: BaseModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={undefined}
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={onClose}
        {...restProps}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cx(
                "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full",
                className,
              )}
            >
              <div
                className={cx("absolute top-0 right-0 pt-4 pr-4", {
                  "opacity-0": !isCloseButtonVisible,
                })}
              >
                <button
                  type="button"
                  className={cx("bg-white rounded-md text-gray-400 hover:text-gray-500", {
                    "cursor-default": !isCloseButtonVisible,
                  })}
                  onClick={isCloseButtonVisible ? undefined : onClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="bg-white p-4 sm:p-6">
                {title && <Dialog.Title>{title}</Dialog.Title>}
                <Dialog.Description>{children}</Dialog.Description>
              </div>
              {footer && (
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  {footer}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BaseModal;
