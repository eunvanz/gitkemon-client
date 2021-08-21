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
    <div className="flex flex-wrap justify-center max-w-screen-xl m-auto">
      {MON_TIERS.map((monTier) => (
        <CollectionStatusItem
          key={monTier}
          tier={monTier}
          value={countInfo[monTier].value}
          max={countInfo[monTier].max}
        />
      ))}
      <CollectionStatusItem value={colPointInfo.value} max={colPointInfo.max} />
    </div>
  );
};

export default CollectionStatus;
