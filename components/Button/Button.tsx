import { useMemo } from "react";
import cx from "classnames";
import { colors } from "../../constants/styles";
import { getCalculatedClassName } from "../../helpers/tailwindHelpers";
import { ExtendableHTMLProps } from "../../types";

export interface ButtonProps
  extends Omit<ExtendableHTMLProps<HTMLButtonElement>, "size" | "type"> {
  color?: "primary" | "secondary" | "white" | "transparent" | "danger" | "black";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRound?: boolean;
  icon?: React.FC<any> | React.ReactNode;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "md",
  children,
  isRound,
  icon: Icon,
  className,
  isLoading = false,
  disabled = false,
  ...restProps
}) => {
  const isDisabled = useMemo(() => {
    return disabled || isLoading;
  }, [disabled, isLoading]);

  const classNameBySize = useMemo(() => {
    switch (size) {
      case "xs":
        return "px-2.5 py-1.5 text-xs";
      case "sm":
        return "px-3 py-2 text-sm";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-4 py-2 text-base";
      case "xl":
        return "px-6 py-3 text-base";
    }
  }, [size]);

  const iconClassName = useMemo(() => {
    switch (size) {
      case "xs":
        return "-ml-0.5 mr-1 h-3 w-3";
      case "sm":
        return "-ml-1 mr-2 h-4 w-4";
      case "md":
        return "-ml-1 mr-2 h-4 w-4";
      case "lg":
        return "-ml-1 mr-3 h-5 w-5";
      case "xl":
        return "-ml-1 mr-3 h-5 w-5";
    }
  }, [size]);

  const classNameByColor = useMemo(() => {
    switch (color) {
      case "primary":
        return `bg-${colors.PRIMARY_COLOR} ${
          !isDisabled
            ? getCalculatedClassName(`hover:bg-${colors.PRIMARY_COLOR} `, 100)
            : ""
        }text-white shadow-sm border border-${colors.PRIMARY_COLOR}`;
      case "secondary":
        return `bg-blue-100 hover:bg-blue-200 text-blue-600 border border-blue-100 shadow-sm`;
      case "white":
        return "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm";
      case "transparent":
        return "hover:bg-gray-100 hover:border-gray-100 text-gray-700";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white border border-red-600 shadow-sm";
      case "black":
        return "bg-gray-900 hover:bg-gray-700 text-white border border-gray-900 shadow-sm";
    }
  }, [color, isDisabled]);

  const classNameByRound = useMemo(() => {
    switch (isRound) {
      case true:
        return "rounded-full";
      default:
        return "rounded";
    }
  }, [isRound]);

  const classNameByDisabled = useMemo(() => {
    return isDisabled ? "opacity-50 cursor-default" : undefined;
  }, [isDisabled]);

  return (
    <button
      disabled={isDisabled}
      className={cx(
        "align-middle inline-flex items-center font-medium justify-center",
        classNameBySize,
        classNameByColor,
        classNameByRound,
        classNameByDisabled,
        className,
      )}
      {...restProps}
    >
      {Icon &&
        !isLoading &&
        (typeof Icon === "function" ? (
          <Icon className={iconClassName} aria-hidden="true" />
        ) : (
          Icon
        ))}
      {isLoading && (
        <svg
          className={`animate-spin ${iconClassName} text-white`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
