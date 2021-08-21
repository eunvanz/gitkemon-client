import { MON_TIERS } from "../../constants/rules";
import { MonTier } from "../../types";
import CollectionStatusItem from "../CollectionStatusItem";

export interface CollectionStatusProps {
  countInfo: Record<MonTier, { value: number; max: number }>;
  colPointInfo: { value: number; max: number };
}

const CollectionStatus: React.FC<CollectionStatusProps> = ({
  countInfo,
  colPointInfo,
}) => {
  return (
    <div className="flex flex-wrap justify-center w-full m-auto mb-4">
      <div className="border rounded m-1 w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 w-full">
          {MON_TIERS.map((monTier) => (
            <CollectionStatusItem
              key={monTier}
              tier={monTier}
              value={countInfo[monTier].value}
              max={countInfo[monTier].max}
            />
          ))}
        </div>
        <CollectionStatusItem value={colPointInfo.value} max={colPointInfo.max} />
      </div>
    </div>
  );
};

export default CollectionStatus;
