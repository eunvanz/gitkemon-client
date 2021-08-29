import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { random } from "lodash";
import { colorHashes } from "~/constants/styles";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { Collection, HuntResult } from "~/types";
import HuntResultItem from "../HuntResultItem";
import MonCard from "../MonCard";
import Shakeable from "../Shakeable";

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

  const burstPowder = useCallback(async () => {
    const { burstStar } = await import("~/helpers/animations");
    const burst = () => {
      const { left, top } = monCardRef.current!.getClientRects()[0];
      const colors = [
        colorHashes.PSYCHIC,
        colorHashes.ICE,
        colorHashes.ELECTRIC,
        colorHashes.GRASS,
        colorHashes.FLYING,
        colorHashes.FIRE,
      ];
      burstStar({
        top: top + 120,
        left: left + 90,
        color: [
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
          colors[random(0, colors.length - 1)],
        ],
        count: 3,
        radius: { 100: 250 },
        duration: 2000,
        itemRadius: 10,
        degreeShift: "rand(-50, 50)",
      });
    };
    burst();
  }, []);

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
        className="relative flex w-1/3 sm:w-1/4 lg:w-1/6 xl:w-1/8 m-auto cursor-move"
        onDrag={burstPowder}
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
        <div className="w-full text-center text-gray-500 animate-pulse">
          <ChevronDoubleLeftIcon className="w-4 h-4 inline-block" /> Shake it!{" "}
          <ChevronDoubleRightIcon className="w-4 h-4 inline-block" />
        </div>
      )}
    </>
  );
};

export default EvolutionCard;
