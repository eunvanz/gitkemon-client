import { convertCollectionToCardMon } from "../../helpers/projectHelpers";
import { Collection } from "../../types";
import MonCard from "../MonCard";

export interface HuntResultItemProps {
  collection: Collection;
  isRevealed: boolean;
  setMonCardHeight?: (height: number) => void;
}

const HuntResultItem: React.FC<HuntResultItemProps> = ({
  collection,
  isRevealed,
  setMonCardHeight,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <MonCard
        mon={convertCollectionToCardMon(collection)}
        isFlipped={!isRevealed}
        setCardHeight={setMonCardHeight}
      />
    </div>
  );
};

export default HuntResultItem;
