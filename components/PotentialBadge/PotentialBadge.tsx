import { useMemo } from "react";
import cx from "classnames";
import { MonPotential } from "~/types";
import Badge, { BadgeProps } from "../Badge";

export interface PotentialBadgeProps extends Omit<BadgeProps, "label"> {
  potential: MonPotential;
}

const PotentialBadge: React.FC<PotentialBadgeProps> = ({
  potential,
  className,
  ...restProps
}) => {
  const colorByPotential = useMemo(() => {
    switch (potential) {
      case "SS":
        return "purple";
      case "S":
        return "red";
      case "A":
        return "orange";
      case "B":
        return "amber";
      case "C":
        return "yellow";
      case "D":
        return "lime";
      case "E":
        return "green";
      case "F":
        return "sky";
    }
  }, [potential]);

  const classNameByPotential = useMemo(() => {
    switch (potential) {
      case "SS":
      case "S":
        return "animate-pulse";
      default:
        return undefined;
    }
  }, [potential]);

  return (
    <Badge
      className={cx(classNameByPotential, className)}
      color={colorByPotential}
      label={potential}
      size="sm"
      {...restProps}
    />
  );
};

export default PotentialBadge;
