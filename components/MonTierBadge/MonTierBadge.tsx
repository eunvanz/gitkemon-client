import { useMemo } from "react";
import cx from "classnames";
import { MonTier } from "../../types";
import Badge, { BadgeProps } from "../Badge";

export interface MonTierBadgeProps extends Omit<BadgeProps, "label"> {
  tier: MonTier;
}

const MonTierBadge: React.FC<MonTierBadgeProps> = ({ tier, className, ...restProps }) => {
  const labelByTier = useMemo(() => {
    switch (tier) {
      case "basic":
        return { short: "B", long: "BASIC" };
      case "rare":
        return { short: "R", long: "RARE" };
      case "special":
        return { short: "S", long: "SPECIAL" };
      case "s.rare":
        return { short: "SR", long: "S.RARE" };
      case "elite":
        return { short: "E", long: "ELITE" };
      case "legend":
        return { short: "L", long: "LEGEND" };
    }
  }, [tier]);

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
    <>
      <Badge
        label={labelByTier.short}
        className={cx("sm:hidden", classNameByTier, className)}
        size="sm"
        isSquare
        {...restProps}
      />
      <Badge
        label={labelByTier.long}
        className={cx("hidden sm:inline-block", classNameByTier, className)}
        size="sm"
        isSquare
        {...restProps}
      />
    </>
  );
};

export default MonTierBadge;
