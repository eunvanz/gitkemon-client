import { useMemo } from "react";
import cx from "classnames";

export interface BadgeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  label: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  isSquare?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  color,
  className,
  size = "md",
  isSquare,
  ...restProps
}) => {
  const classNameBySize = useMemo(() => {
    switch (size) {
      case "sm":
        return "px-1.5 text-xxs";
      case "md":
        return "px-2.5 text-xs";
      case "lg":
        return "px-3 text-sm";
    }
  }, [size]);

  return (
    <span
      className={cx(
        {
          "rounded-full": !isSquare,
        },
        {
          "rounded-sm": isSquare,
        },
        {
          [`bg-${color}-100`]: !!color,
        },
        {
          [`text-${color}-800`]: !!color,
        },
        classNameBySize,
        "inline-flex items-center py-0.5 font-medium",
        className,
      )}
      {...restProps}
    >
      {label}
    </span>
  );
};

export default Badge;
