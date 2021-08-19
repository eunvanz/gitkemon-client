import React, { useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "../../constants/styles";
import { HuntResponse, PokeBallType } from "../../types";
import HuntResultItem from "../HuntResultItem";
import MonCardGrid from "../MonCardGrid";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";
import styles from "./HuntResult.module.css";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: HuntResponse;
  onComplete: VoidFunction;
}

const HuntResult: React.FC<HuntResultProps> = ({ pokeBallType, result, onComplete }) => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const [isCardVisible, setIsCardVisible] = useState(false);

  const hasToShowResult = useMemo(() => {
    return result && isTitleVisible;
  }, [isTitleVisible, result]);

  const pokeBallRef = useRef<HTMLDivElement>(null);

  const [isCardFlipped, setIsCardFlipped] = useState(true);

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
          onComplete();
        }, 1000 + 200 * result!.length);
      })();
    }
  }, [hasToShowResult, isTitleVisible, onComplete, result]);

  useEffect(() => {
    setTimeout(() => setIsTitleVisible(true), 2000);
  }, []);

  return (
    <div className="flex justify-center items-center content-container">
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
              className={cx("flex justify-center", { [styles.wiggle]: !hasToShowResult })}
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
  );
};

export default HuntResult;
