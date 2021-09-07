import { Fragment, HTMLAttributes, ReactNode, useMemo } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";

export interface MenuItem {
  title: string;
  onClick?: VoidFunction;
}

export interface DropDownMenuProps extends HTMLAttributes<HTMLDivElement> {
  buttonClassName?: string;
  buttonLabel: ReactNode;
  header?: ReactNode;
  menuItems: MenuItem[][];
  origin: "right" | "left";
  width: number;
}

const DropDownMenu = ({
  buttonClassName,
  buttonLabel,
  header,
  menuItems,
  origin,
  width,
  ...restProps
}: DropDownMenuProps) => {
  const hasGroup = useMemo(() => {
    return menuItems[0].length > 1;
  }, [menuItems]);

  return (
    <Menu as="div" {...restProps}>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className={buttonClassName}>{buttonLabel}</Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className={classNames(
                `origin-top-${origin} origin-to absolute ${
                  origin.endsWith("right") ? "right" : "left"
                }-0 mt-2 w-${width} rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50`,
                { "divide-y divide-gray": hasGroup || header },
              )}
            >
              {header && <div className="px-4 py-3 text-sm">{header}</div>}
              {menuItems.map((item, index) => {
                return (
                  <div key={index} className="py-1">
                    {item.map((item) => (
                      <Menu.Item key={item.title}>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-800 cursor-pointer",
                            )}
                            onClick={item.onClick}
                          >
                            {item.title}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropDownMenu;
