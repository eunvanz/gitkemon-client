import { useMemo } from "react";
import Badge, { BadgeProps } from "../Badge";

export interface LevelBadgeProps extends Omit<BadgeProps, "label"> {
  level: number;
  evolvableLevel?: number | null;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  evolvableLevel,
  ...restProps
}) => {
  const isEvolvable = useMemo(() => {
    return !!evolvableLevel && level >= evolvableLevel;
  }, [evolvableLevel, level]);

  return (
    <Badge
      isWithDot={isEvolvable}
      color="blue"
      label={`LV. ${level}`}
      size="sm"
      {...restProps}
    />
  );
};

export default LevelBadge;
