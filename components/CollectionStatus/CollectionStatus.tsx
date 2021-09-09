import cx from "classnames";
import { MON_TIERS } from "../../constants/rules";
import { MonTier } from "../../types";
import CollectionStatusItem from "../CollectionStatusItem";

export interface CollectionStatusProps {
  countInfo?: Record<MonTier, { value: number; max: number }>;
  colPointInfo?: { value: number; max: number };
  customSize?: string;
}

const CollectionStatus: React.FC<CollectionStatusProps> = ({
  countInfo,
  colPointInfo,
  customSize,
}) => {
  return (
    <div className="flex flex-wrap justify-center w-full m-auto mb-4">
      <div className="border rounded m-1 w-full">
        <div className={cx(`${customSize || "grid-cols-2 xl:grid-cols-4"} w-full grid`)}>
          {MON_TIERS.map((monTier) => (
            <CollectionStatusItem
              key={monTier}
              tier={monTier}
              value={countInfo?.[monTier].value}
              max={countInfo?.[monTier].max}
            />
          ))}
          <CollectionStatusItem value={colPointInfo?.value} max={colPointInfo?.max} />
        </div>
      </div>
    </div>
  );
};

export default CollectionStatus;
