import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "../../constants/styles";
import { HuntResponse, PokeBallType } from "../../types";
import Button from "../Button";
import HuntResultItem from "../HuntResultItem";
import MonCardGrid from "../MonCardGrid";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";
import styles from "./HuntResult.module.css";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: HuntResponse;
  restPokeBalls: number;
  onChoosePokeBall: VoidFunction;
  onKeepHunting: VoidFunction;
  onGoToCollections: VoidFunction;
}

const HuntResult: React.FC<HuntResultProps> = ({
  pokeBallType,
  result,
  restPokeBalls,
  onChoosePokeBall,
  onKeepHunting,
  onGoToCollections,
}) => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const [isCardVisible, setIsCardVisible] = useState(false);

  const hasToShowResult = useMemo(() => {
    return result && isTitleVisible;
  }, [isTitleVisible, result]);

  const pokeBallRef = useRef<HTMLDivElement>(null);

  const [isCardFlipped, setIsCardFlipped] = useState(true);

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  useEffect(() => {
    if (hasToShowResult) {
      (async () => {
        const { left, top } = pokeBallRef.current!.getClientRects()[0];
        const { burstStar } = await import("../../helpers/animations");
        burstStar({
          top: top + 58,
          left: left + 58,
          color: [
            colorHashes.ELECTRIC,
            colorHashes.BUG,
            colorHashes.FIRE,
            colorHashes.FAIRY,
            colorHashes.GHOST,
            colorHashes.WATER,
            colorHashes.STEEL,
            colorHashes.NORMAL,
          ],
          count: 16,
          radius: { 50: 150 },
          degree: 360,
          opacity: { 1: 0 },
          scale: { 2: 1 },
        });
        setTimeout(() => {
          setIsCardVisible(true);
        }, 500);
        setTimeout(() => {
          setIsCardFlipped(false);
        }, 1000);
        setTimeout(() => {
          setIsButtonsVisible(true);
        }, 1000 + 200 * result!.length);
      })();
    }
  }, [hasToShowResult, isTitleVisible, result]);

  const triggerAnimation = useCallback(() => {
    setTimeout(() => setIsTitleVisible(true), 1000);
  }, []);

  useEffect(() => {
    triggerAnimation();
  }, [triggerAnimation]);

  const keepHuntingCount = useMemo(() => {
    return Math.min(restPokeBalls, result?.length || 0);
  }, [restPokeBalls, result?.length]);

  const handleOnKeepHunting = useCallback(() => {
    setIsTitleVisible(false);
    setIsCardVisible(false);
    setIsCardFlipped(true);
    setIsButtonsVisible(false);
    onKeepHunting();
    triggerAnimation();
  }, [onKeepHunting, triggerAnimation]);

  return (
    <div className="flex flex-col justify-center items-center content-container">
      <div className="flex justify-center">
        <AnimatePresence>
          {hasToShowResult && !isCardVisible && (
            <motion.div
              className={cx("top-40 absolute flex justify-center")}
              initial={{
                transform: "scale(0%)",
              }}
              animate={{
                transform: "scale(100%)",
              }}
              exit={{
                transform: "translateY(-100vh)",
              }}
              transition={{
                type: "spring",
                bounce: 0.8,
              }}
            >
              <Typography as="h1" weight="extrabold" color="primary" size="4xl">
                GOTCHA!
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isCardVisible && (
            <motion.div
              initial={{
                transform: "scale(20%)",
              }}
              animate={{
                transform: "scale(100%)",
              }}
              exit={{
                transform: "translateY(-100vh)",
                position: "absolute",
              }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <div
                ref={pokeBallRef}
                className={cx("flex justify-center", {
                  [styles.wiggle]: !hasToShowResult,
                })}
              >
                <PokeBallImage type={pokeBallType} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isCardVisible &&
            result &&
            (result.length > 1 ? (
              <motion.div
                className="w-full"
                initial={{
                  transform: "translateY(80vh)",
                }}
                animate={{
                  transform: "translateY(0vh)",
                }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <MonCardGrid>
                  {result.map((item, index) => (
                    <HuntResultItem
                      key={index}
                      huntResult={item}
                      isRevealed={!isCardFlipped}
                      delay={index * 200}
                    />
                  ))}
                </MonCardGrid>
              </motion.div>
            ) : (
              <motion.div
                className="flex justify-center w-full max-w-screen-lg m-auto"
                initial={{
                  transform: "translateY(80vh)",
                }}
                animate={{
                  transform: "translateY(0vh)",
                }}
                transition={{ type: "spring", bounce: 0.4 }}
              >
                <HuntResultItem
                  huntResult={result[0]}
                  isRevealed={!isCardFlipped}
                  isSingle
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isButtonsVisible && (
          <motion.div
            className="flex-0 justify-center p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Button color="white" onClick={onChoosePokeBall}>
              Choose Pokeball
            </Button>
            {!!keepHuntingCount ? (
              <Button className="ml-2" onClick={handleOnKeepHunting}>
                Keep hunting
                {keepHuntingCount > 1 && (
                  <>
                    <XIcon className="mx-1 w-4 h-4" />
                    {keepHuntingCount}
                  </>
                )}
              </Button>
            ) : (
              <Button className="ml-2" onClick={onGoToCollections}>
                Go to collections
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HuntResult;
