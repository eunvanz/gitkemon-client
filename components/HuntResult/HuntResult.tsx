import React, { useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "../../constants/styles";
import { Collection, PokeBallType } from "../../types";
import PokeBallImage from "../PokeBallImage";
import styles from "./HuntResult.module.css";

export interface HuntResultProps {
  type: PokeBallType;
  result?: Collection[];
}

const HuntResult: React.FC<HuntResultProps> = ({ type, result }) => {
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
            <PokeBallImage type={type} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HuntResult;
