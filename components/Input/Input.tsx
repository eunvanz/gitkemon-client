import { forwardRef, useMemo } from "react";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { colors } from "../../constants/styles";
import { ExtendableHTMLProps } from "../../types";

export interface InputProps extends ExtendableHTMLProps<HTMLInputElement> {
  labe?: string;
  wrapperClassName?: string;
  hint?: string;
  hasError?: boolean;
  errorMessage?: string;
  onClear?: VoidFunction;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      id,
      wrapperClassName,
      className,
      type = "text",
      hint,
      hasError,
      errorMessage,
      onClear,
      ...restProps
    },
    ref,
  ) => {
    const innerId = useMemo(() => {
      return id || name;
    }, [id, name]);

    const borderClassName = useMemo(() => {
      if (hasError) {
        return "border border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500";
      } else {
        return `focus:ring-${colors.PRIMARY_COLOR} focus:border-${colors.PRIMARY_COLOR} border-gray-300 border`;
      }
    }, [hasError]);

    return (
      <div className={wrapperClassName}>
        {label && (
          <label htmlFor={innerId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className={cx(label ? "mt-1 relative" : undefined)}>
          <input
            className={cx(
              "py-2 px-3 shadow-sm block w-full sm:text-sm rounded-md",
              borderClassName,
              {
                "text-red-900 placeholder-red-300": hasError,
              },
              className,
            )}
            type={type}
            ref={ref}
            {...restProps}
          />
          {restProps.value && onClear && (
            <span
              role="button"
              onClick={onClear}
              className={`absolute inset-y-0 right-${
                hasError ? 7 : 3
              } flex items-center text-gray-200 hover:text-gray-400`}
            >
              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          {hasError && (
            <div
              className={`absolute inset-y-0 right-0 flex items-center pointer-events-none ${
                type === "number" ? "pr-8" : "pr-3"
              }`}
            >
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
        {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
