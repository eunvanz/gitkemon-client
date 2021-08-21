import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";

export interface AccordionProps {
  title: string;
  isOpenDefault?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, isOpenDefault, children }) => {
  return (
    <Disclosure
      as="div"
      className="border-b border-gray-200 py-6"
      defaultOpen={isOpenDefault}
    >
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{title}</span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Accordion;
