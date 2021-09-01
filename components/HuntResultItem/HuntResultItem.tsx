import { useEffect, useState } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { MON_CARD_WIDTH } from "~/constants/styles";
import {
  convertCollectionToCardMon,
  convertCollectionToModalMon,
} from "../../helpers/projectHelpers";
import { HuntResult } from "../../types";
import Badge from "../Badge";
import LevelBadge from "../LevelBadge";
import MonCard from "../MonCard";

export interface HuntResultItemProps {
  huntResult: HuntResult;
  isRevealed: boolean;
  delay?: number;
  isSingle?: boolean;
  isDiffHidden?: boolean;
  isClickDisabled?: boolean;
  isFullWidth?: boolean;
  isMonCardWidth?: boolean;
}

const HuntResultItem: React.FC<HuntResultItemProps> = ({
  huntResult,
  isRevealed,
  delay,
  isSingle,
  isDiffHidden,
  isClickDisabled,
  isFullWidth,
  isMonCardWidth,
}) => {
  const { oldCollection, newCollection } = huntResult;

  const [isRealRevealed, setIsRealRevealed] = useState(isRevealed);

  useEffect(() => {
    if (isRevealed && !isDiffHidden) {
      const timer = setTimeout(() => {
        setIsRealRevealed(isRevealed);
      }, delay || 0);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay, isDiffHidden, isRevealed]);

  return (
    <div
      className={cx(
        "flex flex-col justify-center mb-4",
        isMonCardWidth
          ? MON_CARD_WIDTH
          : isFullWidth
          ? "w-full"
          : isSingle
          ? "w-40"
          : "w-1/3 sm:w-1/4 md:w-1/6",
      )}
    >
      <MonCard
        isFullWidth
        mon={convertCollectionToCardMon(newCollection)}
        oldMon={oldCollection ? convertCollectionToModalMon(oldCollection) : undefined}
        newMon={convertCollectionToModalMon(newCollection)}
        isFlipped={!isRealRevealed}
        isClickDisabled={isClickDisabled}
        isOwned
      />
      {!isDiffHidden && (
        <div
          className={cx(
            "flex justify-center mt-2 opacity-0 transition-opacity delay-300",
            isRealRevealed ? "opacity-100" : undefined,
          )}
        >
          {oldCollection ? (
            oldCollection.level === newCollection.level ? (
              <Badge color="gray" label="FAIL" size="sm" />
            ) : (
              <>
                <LevelBadge level={oldCollection.level} />
                <ArrowNarrowRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                <LevelBadge level={newCollection.level} />
              </>
            )
          ) : (
            <Badge color="red" label="NEW" size="sm" />
          )}
        </div>
      )}
    </div>
  );
};

export default HuntResultItem;
