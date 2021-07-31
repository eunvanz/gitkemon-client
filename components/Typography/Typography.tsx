import { useMemo } from "react";
import cx from "classnames";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "primary" | "hint" | string;
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";
  size?: "xxs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const Typography: React.FC<TypographyProps> = ({
  as: As = "span",
  color,
  weight,
  className,
  size,
  ...restProps
}) => {
  const classNameByColor = useMemo(() => {
    switch (color) {
      case "primary":
        return "text-blue-500";
      case "black":
        return "text-black";
      case "hint":
        return "text-gray-400";
      case undefined:
        return "text-gray-600";
      default:
        return `text-${color}-500`;
    }
  }, [color]);

  const classNameBySize = useMemo(() => {
    switch (size) {
      case undefined:
        return undefined;
      default:
        return `text-${size}`;
    }
  }, [size]);

  const classNameByWeight = useMemo(() => {
    switch (weight) {
      case undefined:
        return undefined;
      default:
        return `font-${weight}`;
    }
  }, [weight]);

  return (
    <As
      className={cx(classNameByColor, classNameByWeight, classNameBySize, className)}
      {...restProps}
    />
  );
};

export default Typography;
