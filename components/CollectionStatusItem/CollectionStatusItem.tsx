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
    <div className={cx("flex flex-col p-4 w-full")}>
      <div className="mb-1">
        <Typography>{tier ? tier.toUpperCase() : "POINTS"}</Typography>
        <Typography className="ml-2" weight="light" color="gray">
          {value} / {max}
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
