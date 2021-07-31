import { useMemo } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { ExtendableHTMLProps } from "../../types";

export interface InputProps extends ExtendableHTMLProps<HTMLInputElement> {
  labe?: string;
  wrapperClassName?: string;
  hint?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  id,
  wrapperClassName,
  className,
  type = "text",
  hint,
  hasError,
  errorMessage,
  ...restProps
}) => {
  const innerId = useMemo(() => {
    return id || name;
  }, [id, name]);

  const borderClassName = useMemo(() => {
    if (hasError) {
      return "border border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500";
    } else {
      return "focus:ring-blue-500 focus:border-blue-500 border-gray-300 border";
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
            "p-2 shadow-sm block w-full sm:text-sm rounded-md",
            borderClassName,
            {
              "text-red-900 placeholder-red-300": hasError,
            },
            className,
          )}
          type={type}
          {...restProps}
        />
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      {hint && <p className="mt-2 text-sm text-gray-500">{hint}</p>}
    </div>
  );
};

export default Input;
