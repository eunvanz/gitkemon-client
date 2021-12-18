import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { colorHashes } from "~/constants/styles";
import { PokeBallType } from "~/types";
import PokeBallImage from "../PokeBallImage";
import styles from "./PokeBallDrop.module.css";

export interface PokeBallDropProps {
  type: PokeBallType;
  onFinish: VoidFunction;
}

const PokeBallDrop: React.FC<PokeBallDropProps> = ({ type, onFinish }) => {
  const [isPokeBallVisible, setIsPokeBallVisible] = useState(false);

  const pokeBallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setIsPokeBallVisible(true), 100);
    setTimeout(async () => {
      const { left, top } = pokeBallRef.current!.getClientRects()[0];
      const { burstStar } = await import("~/helpers/animations");
      burstStar({
        top: top + 11.5,
        left: left + 11.5,
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
        radius: { 20: 50 },
        degree: 360,
        opacity: { 1: 0 },
      });
    }, 600);
    setTimeout(onFinish, 1000);
  }, [onFinish]);

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <AnimatePresence>
        {isPokeBallVisible && (
          <motion.div
            className={cx("absolute top-0", styles.bounce)}
            initial={{ transform: "translateY(-116px) scale(40%)" }}
            animate={{
              transform: `translateY(${window.innerHeight / 2 - 90}px) scale(20%)`,
            }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            <div ref={pokeBallRef} className="flex justify-center">
              <PokeBallImage type={type} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokeBallDrop;
