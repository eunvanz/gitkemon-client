import { useMemo } from "react";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: "primary" | "secondary" | "white";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isRound?: boolean;
  icon: React.FC<any>;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "m",
  children,
  isRound,
  icon: Icon,
  ...restProps
}) => {
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
        return "bg-blue-500 hover:bg-blue-600 text-white shadow-sm";
      case "secondary":
        return "bg-blue-100 hover:bg-blue-200 text-blue-600";
      case "white":
        return "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm";
    }
  }, [color]);

  const classNameByRound = useMemo(() => {
    switch (isRound) {
      case true:
        return "rounded-full";
      case false:
        return "rounded";
    }
  }, [isRound]);

  return (
    <button
      className={`${classNameBySize} ${classNameByColor} ${classNameByRound} inline-flex items-center border border-transparent font-medium`}
      {...restProps}
    >
      {Icon && <Icon className={iconClassName} aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;
