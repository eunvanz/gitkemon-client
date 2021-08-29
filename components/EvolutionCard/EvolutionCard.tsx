import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { random } from "lodash";
import { colorHashes } from "~/constants/styles";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { Collection, HuntResult } from "~/types";
import HuntResultItem from "../HuntResultItem";
import MonCard from "../MonCard";
import Shakeable from "../Shakeable";
import Typography from "../Typography";
import styles from "./EvolutionCard.module.css";

const MAX_SHAKE_COUNT = 20;

export interface EvolutionCardProps {
  evolveMon: Collection;
  result: HuntResult;
  onFinish: VoidFunction;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({ evolveMon, result, onFinish }) => {
  const [progress, setProgress] = useState(0);

  const isProgressCompleteRef = useRef<boolean>(false);

  const handleOnChangeDirection = useCallback((count: number) => {
    if (count === MAX_SHAKE_COUNT) {
      isProgressCompleteRef.current = true;
    }
    setProgress(count);
  }, []);

  const isProgressComplete = useMemo(() => {
    return progress >= MAX_SHAKE_COUNT;
  }, [progress]);

  const monCardRef = useRef<HTMLDivElement>(null);

  const handleOnDragEnd = useCallback(() => {
    if (!isProgressCompleteRef.current) {
      setProgress(0);
    }
  }, []);

  useEffect(() => {
    if (isProgressComplete) {
      isProgressCompleteRef.current = true;
      onFinish();
    }
  }, [isProgressComplete, onFinish]);

  return (
    <>
      <Shakeable
        onChangeDirection={handleOnChangeDirection}
        isActive={!isProgressComplete}
        className="relative flex w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8 m-auto cursor-grab"
        onDragEnd={handleOnDragEnd}
      >
        <div ref={monCardRef}>
          {!isProgressComplete && (
            <MonCard
              mon={convertCollectionToCardMon(evolveMon)}
              isClickDisabled
              className={`absolute opacity-${
                100 - (100 / MAX_SHAKE_COUNT) * progress
              } transition-opacity z-20`}
              isFullWidth
            />
          )}
          {!isProgressComplete && (
            <MonCard
              mon={convertCollectionToCardMon(result.newCollection)}
              isClickDisabled
              className={`opacity-${
                progress * (100 / MAX_SHAKE_COUNT)
              } transition-opacity`}
              isFullWidth
            />
          )}
          {isProgressComplete && (
            <HuntResultItem huntResult={result} isRevealed isFullWidth />
          )}
        </div>
      </Shakeable>
      {progress === 0 && (
        <Typography
          color="hint"
          weight="light"
          as="div"
          className={cx("w-full text-center animate-pulse mt-2", styles.nudge)}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4 inline-block" /> Shake it!{" "}
          <ChevronDoubleRightIcon className="w-4 h-4 inline-block" />
        </Typography>
      )}
    </>
  );
};

export default EvolutionCard;
