import React, { useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "../../constants/styles";
import { convertCollectionToCardMon } from "../../helpers/projectHelpers";
import { HuntResponse, PokeBallType } from "../../types";
import HuntResultItem from "../HuntResultItem/HuntResultItem";
import MonCard from "../MonCard";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";
import styles from "./HuntResult.module.css";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: HuntResponse;
}

const HuntResult: React.FC<HuntResultProps> = ({ pokeBallType, result }) => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);

  const [isCardVisible, setIsCardVisible] = useState(false);

  const hasToShowResult = useMemo(() => {
    return result && isTitleVisible;
  }, [isTitleVisible, result]);

  const pokeBallRef = useRef<HTMLDivElement>(null);

  const [isCardFlipped, setIsCardFlipped] = useState(true);

  const [monCardHeight, setMonCardHeight] = useState(0);

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
      })();
    }
  }, [hasToShowResult, isTitleVisible, result]);

  useEffect(() => {
    setTimeout(() => setIsTitleVisible(true), 2000);
  }, []);

  return (
    <div className="flex justify-center items-center content-container">
      <AnimatePresence>
        {hasToShowResult && (
          <motion.div
            className={cx("top-40 absolute flex justify-center")}
            initial={{
              transform: "scale(0%)",
            }}
            animate={{
              transform: "scale(100%)",
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
              transform: "translateY(-60vh)",
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
            <motion.div></motion.div>
          ) : (
            <motion.div
              className="flex justify-center absolute"
              initial={{
                transform: "translateY(80vh)",
              }}
              animate={{
                transform: "translateY(0vh)",
              }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <div className="w-40" style={{ height: monCardHeight }}>
                <HuntResultItem
                  huntResult={result[0]}
                  isRevealed={!isCardFlipped}
                  setMonCardHeight={setMonCardHeight}
                />
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default HuntResult;
