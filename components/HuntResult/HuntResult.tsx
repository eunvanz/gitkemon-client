import React, { useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "../../constants/styles";
import { Collection, PokeBallType } from "../../types";
import MonCard from "../MonCard";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";
import styles from "./HuntResult.module.css";

export interface HuntResultProps {
  pokeBallType: PokeBallType;
  result?: Collection[];
}

const HuntResult: React.FC<HuntResultProps> = ({ pokeBallType, result }) => {
  const [isResultVisible, setIsResultVisible] = useState(false);

  const hasToShowResult = useMemo(() => {
    return result && isResultVisible;
  }, [isResultVisible, result]);

  const pokeBallRef = useRef<HTMLDivElement>(null);

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
      })();
    }
  }, [hasToShowResult, isResultVisible, result]);

  useEffect(() => {
    setTimeout(() => setIsResultVisible(true), 2000);
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
        <motion.div
          initial={{
            transform: "scale(20%)",
          }}
          animate={{
            transform: "scale(100%)",
          }}
          transition={{ duration: 1 }}
        >
          <div
            ref={pokeBallRef}
            className={cx("flex justify-center", { [styles.wiggle]: !hasToShowResult })}
          >
            <PokeBallImage type={pokeBallType} />
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {hasToShowResult && result && result.length > 1 ? (
          <motion.div></motion.div>
        ) : (
          <motion.div
            className="flex justify-center"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <div className="w-40"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HuntResult;
