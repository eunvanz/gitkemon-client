import {
  convertCollectionToCardMon,
  convertCollectionToModalMon,
} from "../../helpers/projectHelpers";
import { HuntResult } from "../../types";
import MonCard from "../MonCard";

export interface HuntResultItemProps {
  huntResult: HuntResult;
  isRevealed: boolean;
  setMonCardHeight?: (height: number) => void;
}

const HuntResultItem: React.FC<HuntResultItemProps> = ({
  huntResult,
  isRevealed,
  setMonCardHeight,
}) => {
  return (
    <div className="flex flex-col justify-center">
      <MonCard
        mon={convertCollectionToCardMon(huntResult.newCollection)}
        oldMon={
          huntResult.oldCollection
            ? convertCollectionToModalMon(huntResult.oldCollection)
            : undefined
        }
        isFlipped={!isRevealed}
        setCardHeight={setMonCardHeight}
      />
    </div>
  );
};

export default HuntResultItem;
