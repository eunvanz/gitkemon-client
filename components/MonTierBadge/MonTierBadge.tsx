import { useMemo } from "react";
import cx from "classnames";
import { MonTier } from "../../types";
import Badge, { BadgeProps } from "../Badge";

export interface MonTierBadgeProps extends Omit<BadgeProps, "label"> {
  tier: MonTier;
  isShorten?: boolean;
}

const MonTierBadge: React.FC<MonTierBadgeProps> = ({
  tier,
  isShorten,
  className,
  ...restProps
}) => {
  const labelByTier = useMemo(() => {
    switch (tier) {
      case "basic":
        return isShorten ? "B" : "BASIC";
      case "rare":
        return isShorten ? "R" : "RARE";
      case "special":
        return isShorten ? "S" : "SPECIAL";
      case "s.rare":
        return isShorten ? "SR" : "S.RARE";
      case "elite":
        return isShorten ? "E" : "ELITE";
      case "legend":
        return isShorten ? "L" : "LEGEND";
    }
  }, [isShorten, tier]);

  const classNameByTier = useMemo(() => {
    switch (tier) {
      case "basic":
        return "bg-yellow-200 text-yellow-800";
      case "rare":
        return "bg-green-200 text-green-800";
      case "special":
        return "bg-blue-200 text-blue-800";
      case "s.rare":
        return "bg-purple-200 text-purple-800";
      case "elite":
        return "bg-pink-200 text-pink-800";
      case "legend":
        return "bg-red-200 text-red-800";
    }
  }, [tier]);

  return (
    <Badge
      label={labelByTier}
      className={cx(classNameByTier, className)}
      size="sm"
      isSquare
      {...restProps}
    />
  );
};

export default MonTierBadge;
