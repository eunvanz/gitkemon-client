import { useMemo } from "react";
import cx from "classnames";
import Skeleton from "react-loading-skeleton";
import { colorsByTier } from "~/constants/styles";
import { MonTier } from "~/types";
import LineGauge from "../LineGauge";
import Typography from "../Typography";

export interface CollectionStatusItemProps {
  tier?: MonTier;
  value?: number;
  max?: number;
}

const CollectionStatusItem: React.FC<CollectionStatusItemProps> = ({
  tier,
  value,
  max,
}) => {
  const isLoading = useMemo(() => {
    return value === undefined || max === undefined;
  }, [max, value]);

  return (
    <div className={cx("flex flex-col p-4 w-full")}>
      <div className="mb-1">
        {isLoading ? (
          <Skeleton style={{ display: "inline-block", width: 140 }} />
        ) : (
          <>
            <Typography>{tier ? tier.toUpperCase() : "POINTS"}</Typography>
            <Typography className="ml-2" weight="light" color="gray">
              {value!.toLocaleString()} / {max!.toLocaleString()}
            </Typography>
          </>
        )}
      </div>
      <LineGauge
        values={[
          {
            value: isLoading ? 0 : (value! * 100) / max!,
            color: `${tier ? colorsByTier[tier] : "blue"}-400`,
          },
        ]}
      />
    </div>
  );
};

export default CollectionStatusItem;
