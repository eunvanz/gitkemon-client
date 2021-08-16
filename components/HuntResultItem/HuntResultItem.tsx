import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
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
  setMonCardHeight?: (height: number) => void;
}

const HuntResultItem: React.FC<HuntResultItemProps> = ({
  huntResult,
  isRevealed,
  setMonCardHeight,
}) => {
  const { oldCollection, newCollection } = huntResult;
  return (
    <div className="flex flex-col justify-center">
      <MonCard
        mon={convertCollectionToCardMon(newCollection)}
        oldMon={oldCollection ? convertCollectionToModalMon(oldCollection) : undefined}
        isFlipped={!isRevealed}
        setCardHeight={setMonCardHeight}
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
          {isRevealed &&
            (oldCollection ? (
              <>
                <LevelBadge
                  level={oldCollection.level}
                  evolvableLevel={oldCollection.evolutionLevel}
                />
                <ArrowNarrowRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                <LevelBadge
                  level={newCollection.level}
                  evolvableLevel={newCollection.evolutionLevel}
                />
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
