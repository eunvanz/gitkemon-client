import React, { Fragment, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { colors } from "../../constants/styles";
import { ExtendableHTMLProps } from "../../types";
import Input from "../Input";
import { SelectItem } from "../Select";

export interface SearchableSelectProps<T>
  extends Omit<ExtendableHTMLProps<HTMLDivElement>, "onChange" | "value"> {
  value?: T;
  onChange: (value: T) => void;
  label?: string;
  items: SelectItem<T>[];
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  hint?: string;
  onClear?: VoidFunction;
}

function SearchableSelect<T>({
  value,
  onChange,
  label,
  items,
  placeholder,
  hasError,
  errorMessage,
  hint,
  className,
  onClear,
  ...restProps
}: SearchableSelectProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.displayValue.match(inputValue);
    });
  }, [inputValue, items]);

  return (
    <div className={cx("relative", className)} {...restProps}>
      <Input
        onFocus={() => {
          setIsDropdownOpen(true);
          setIsFocused(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setIsDropdownOpen(false);
            setInputValue("");
            setIsFocused(false);
          }, 200);
        }}
        value={
          isFocused
            ? inputValue
            : items.find((item) => item.value === value)?.displayValue || ""
        }
        onChange={(e) => {
          // @ts-ignore
          setInputValue(e.target.value);
        }}
        label={label}
        placeholder={placeholder}
        onClear={onClear}
      />
      <Listbox value={value} onChange={onChange}>
        <Transition
          show={isDropdownOpen}
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            static
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {filteredItems.map((item) => (
              <Listbox.Option
                key={item.displayValue}
                className={`hover:text-white hover:bg-${colors.PRIMARY_COLOR} text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9`}
                value={item.value}
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
      </Listbox>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
}

export default SearchableSelect;
