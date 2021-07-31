import { useMemo } from "react";
import cx from "classnames";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  color?: "primary" | "sub" | string;
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
}

const Typography: React.FC<TypographyProps> = ({
  as: As = "span",
  color = "text-gray-900",
  weight = "normal",
  className,
  ...restProps
}) => {
  const classNameByColor = useMemo(() => {
    switch (color) {
      case "primary":
        return "text-blue-500";
      case "sub":
        return "text-gray-600";
      default:
        return `text-${color}-500`;
    }
  }, [color]);

  return (
    <As className={cx(classNameByColor, `font-${weight}`, className)} {...restProps} />
  );
};

export default Typography;
