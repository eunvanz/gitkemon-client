import { useMemo } from "react";
import { MonPotential } from "../../types";
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
        return "cyan";
    }
  }, [potential]);

  return <Badge color={colorByPotential} label={potential} size="sm" {...restProps} />;
};

export default PotentialBadge;
