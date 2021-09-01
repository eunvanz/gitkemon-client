import { useMemo } from "react";
import cx from "classnames";
import Badge, { BadgeProps } from "../Badge";

export interface LevelBadgeProps extends Omit<BadgeProps, "label"> {
  level: number;
  evolvableLevel?: number | null;
  isMax?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  evolvableLevel,
  isMax,
  ...restProps
}) => {
  const isEvolvable = useMemo(() => {
    return !!evolvableLevel && level >= evolvableLevel;
  }, [evolvableLevel, level]);

  return (
    <Badge
      isWithDot={isEvolvable}
      color={cx(isMax ? "green" : "blue")}
      label={`LV. ${level}`}
      size="sm"
      {...restProps}
    />
  );
};

export default LevelBadge;
