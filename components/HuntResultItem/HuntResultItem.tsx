import { useEffect, useState } from "react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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
}

const HuntResultItem: React.FC<HuntResultItemProps> = ({
  huntResult,
  isRevealed,
  delay,
  isSingle,
}) => {
  const { oldCollection, newCollection } = huntResult;

  const [isRealRevealed, setIsRealRevealed] = useState(isRevealed);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsRealRevealed(isRevealed);
      }, delay || 0);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay, isRevealed]);

  return (
    <div
      className={cx(
        "flex flex-col justify-center mb-4",
        isSingle ? "w-40" : "w-1/3 sm:w-1/4 md:w-1/6",
      )}
    >
      <MonCard
        isFullWidth
        mon={convertCollectionToCardMon(newCollection)}
        oldMon={oldCollection ? convertCollectionToModalMon(oldCollection) : undefined}
        newMon={convertCollectionToModalMon(newCollection)}
        isFlipped={!isRealRevealed}
      />
      <AnimatePresence>
        <motion.div
          className="flex justify-center mt-2"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          {isRealRevealed &&
            (oldCollection ? (
              <>
                <LevelBadge level={oldCollection.level} />
                <ArrowNarrowRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                <LevelBadge level={newCollection.level} />
              </>
            ) : (
              <Badge color="red" label="NEW" size="sm" />
            ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HuntResultItem;