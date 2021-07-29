import cx from "classnames";

export interface BadgeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  label: string;
  color: string;
  size?: "sm" | "lg";
}

const Badge: React.FC<BadgeProps> = ({
  label,
  color,
  className,
  size = "sm",
  ...restProps
}) => {
  return (
    <span
      className={cx(
        className,
        `inline-flex items-center px-${
          size === "sm" ? "2.5" : "3"
        } py-0.5 rounded-full text-${
          size === "sm" ? "xs" : "sm"
        } font-medium bg-${color}-100 text-${color}-800`,
      )}
      {...restProps}
    >
      {label}
    </span>
  );
};

export default Badge;
