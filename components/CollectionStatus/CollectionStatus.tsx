import { MonTier } from "../../types";

export interface CollectionStatusProps {
  count: Record<MonTier, number>;
}

const CollectionStatus: React.FC<CollectionStatusProps> = ({ count }) => {
  return <div className="flex flex-wrap justify-center max-w-screen-xl m-auto"></div>;
};

export default CollectionStatus;
