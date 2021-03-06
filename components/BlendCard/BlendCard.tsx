import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { isMobile } from "react-device-detect";
import { convertCollectionToCardMon } from "~/helpers/projectHelpers";
import { Collection, HuntResult, User } from "~/types";
import HuntResultItem from "../HuntResultItem";
import LineGauge from "../LineGauge";
import MonCard from "../MonCard";
import Shakeable from "../Shakeable";
import Typography from "../Typography";
import styles from "../EvolutionCard/EvolutionCard.module.css";

const MAX_SHAKE_COUNT = 20;

export interface BlendCardProps {
  blendMons: Collection[];
  result: HuntResult;
  onFinish: VoidFunction;
  user: User;
}

const BlendCard: React.FC<BlendCardProps> = ({ blendMons, result, onFinish, user }) => {
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
        className="relative"
        onDragEnd={handleOnDragEnd}
      >
        <div ref={monCardRef} className="flex justify-center w-full">
          {!isProgressComplete && (
            <>
              <MonCard
                mon={convertCollectionToCardMon(blendMons[0])}
                isClickDisabled
                className={`opacity-${
                  100 - (100 / MAX_SHAKE_COUNT) * progress
                } transition-all z-20`}
                style={{
                  transform: `translateX(${((progress / MAX_SHAKE_COUNT) * 100) / 2}%)`,
                }}
                user={user}
                isOwned
              />
              <MonCard
                mon={convertCollectionToCardMon(blendMons[1])}
                isClickDisabled
                className={`opacity-${
                  100 - (100 / MAX_SHAKE_COUNT) * progress
                } transition-all z-20`}
                style={{
                  transform: `translateX(${((progress / MAX_SHAKE_COUNT) * -100) / 2}%)`,
                }}
                user={user}
                isOwned
              />
            </>
          )}
          {!isProgressComplete && (
            <MonCard
              mon={convertCollectionToCardMon(result.newCollection)}
              isClickDisabled
              className={`absolute opacity-${
                progress * (100 / MAX_SHAKE_COUNT)
              } transition-opacity`}
            />
          )}
          {isProgressComplete && (
            <HuntResultItem huntResult={result} isRevealed isMonCardWidth user={user} />
          )}
        </div>
      </Shakeable>
      {progress === 0 && (
        <Typography
          color="hint"
          weight="light"
          as="div"
          className={cx(
            "w-full text-center animate-pulse mt-2",
            isMobile ? undefined : styles.nudge,
          )}
        >
          <ChevronDoubleLeftIcon className="w-4 h-4 inline-block" />{" "}
          {isMobile ? "Tap it!" : "Shake it!"}{" "}
          <ChevronDoubleRightIcon className="w-4 h-4 inline-block" />
        </Typography>
      )}
      {isMobile && progress > 0 && !isProgressComplete && (
        <div className="w-36 mx-auto mt-4">
          <LineGauge
            values={[{ color: "blue-500", value: (progress * 100) / MAX_SHAKE_COUNT }]}
          />
        </div>
      )}
    </>
  );
};

export default BlendCard;
