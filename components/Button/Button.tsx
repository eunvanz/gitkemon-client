import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cx from "classnames";
import { colors } from "../../constants/styles";
import { ExtendableHTMLProps } from "../../types";

export interface ButtonProps
  extends Omit<ExtendableHTMLProps<HTMLButtonElement>, "size" | "type"> {
  color?: "primary" | "secondary" | "white" | "transparent";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRound?: boolean;
  icon?: React.FC<any> | React.ReactNode;
  isLoading?: boolean;
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
          isDisabled ? "hover:bg-blue-600 " : ""
        }text-white shadow-sm`;
      case "secondary":
        return `bg-blue-100 hover:bg-blue-200 text-blue-600`;
      case "white":
        return "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm";
      case "transparent":
        return "hover:bg-gray-100 text-gray-700";
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

  return (
    <button
      disabled={isDisabled}
      className={cx(
        `${classNameBySize} ${classNameByColor} ${classNameByRound} align-middle inline-flex items-center font-medium`,
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
