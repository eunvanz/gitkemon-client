import { Fragment, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { colors } from "../../constants/styles";
import { ExtendableHTMLProps } from "../../types";
import Typography from "../Typography";

export interface SelectItem {
  id: number | string;
  displayValue: string;
}

export interface SelectProps<TItem extends SelectItem>
  extends Omit<ExtendableHTMLProps<HTMLDivElement>, "onChange" | "value"> {
  value?: TItem;
  onChange: (item: TItem) => void;
  label?: string;
  items: TItem[];
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
}

function Select<TItem extends SelectItem>({
  value,
  onChange,
  label,
  items,
  placeholder,
  hasError,
  errorMessage,
  hint,
  ...restProps
}: SelectProps<TItem>) {
  const borderClassName = useMemo(() => {
    if (hasError) {
      return "border border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500";
    } else {
      return `focus:ring-${colors.PRIMARY_COLOR} focus:border-${colors.PRIMARY_COLOR} border-gray-300 border`;
    }
  }, [hasError]);

  return (
    <div {...restProps}>
      <Listbox value={value} onChange={onChange}>
        {({ open }) => (
          <>
            {label && (
              <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </Listbox.Label>
            )}
            <div className="relative">
              <Listbox.Button
                className={cx(
                  `bg-white relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:ring-1 sm:text-sm`,
                  borderClassName,
                )}
              >
                <span className={cx("block truncate")}>
                  {value?.displayValue || (
                    <Typography color="hint">
                      {placeholder || "Select an item"}
                    </Typography>
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  {items.map((item) => (
                    <Listbox.Option
                      key={item.id}
                      className={({ active }) =>
                        cx(
                          active
                            ? `text-white bg-${colors.PRIMARY_COLOR}`
                            : "text-gray-900",
                          "cursor-default select-none relative py-2 pl-3 pr-9",
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={cx(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate",
                            )}
                          >
                            {item.displayValue}
                          </span>

                          {selected ? (
                            <span
                              className={cx(
                                active ? "text-white" : `text-${colors.PRIMARY_COLOR}`,
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

export default Select;
