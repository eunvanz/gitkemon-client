import cx from "classnames";
import { colorsByTier } from "../../constants/styles";
import { MonTier } from "../../types";
import LineGauge from "../LineGauge";
import Typography from "../Typography";

export interface CollectionStatusItemProps {
  tier?: MonTier;
  value: number;
  max: number;
}

const CollectionStatusItem: React.FC<CollectionStatusItemProps> = ({
  tier,
  value,
  max,
}) => {
  return (
    <div className={cx("flex flex-col p-4", tier ? "w-1/2 sm:w-1/3 lg:w-1/6" : "w-full")}>
      <div className="mb-1">
        <Typography>{tier ? tier.toUpperCase() : "COLLECTION POINT"}</Typography>
        <Typography className="ml-2" weight="light" color="gray">
          {value}
          {tier ? "" : "P"} / {max}
          {tier ? "" : "P"}
        </Typography>
      </div>
      <LineGauge
        values={[
          {
            value: (value * 100) / max,
            color: `${tier ? colorsByTier[tier] : "blue"}-400`,
          },
        ]}
      />
    </div>
  );
};

export default CollectionStatusItem;
