import { useEffect, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { HEADER_HEIGHT } from "../../constants/styles";
import { PokeBallType } from "../../types";
import PokeBallImage from "../PokeBallImage";
import styles from "./PokeBallDrop.module.css";

export interface PokeBallDropProps {
  type: PokeBallType;
}

const PokeBallDrop: React.FC<PokeBallDropProps> = ({ type }) => {
  const [isPokeBallVisible, setIsPokeBallVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsPokeBallVisible(true), 500);
  }, []);

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <AnimatePresence>
        {isPokeBallVisible && (
          <motion.div
            className={cx("absolute top-0", styles.bounce)}
            initial={{ transform: "translateY(-116px) scale(40%)" }}
            animate={{
              transform: `translateY(${
                window.innerHeight / 2 - 58 - HEADER_HEIGHT
              }px) scale(10%)`,
            }}
            transition={{ ease: "easeIn", duration: 0.5 }}
          >
            <div className="flex justify-center">
              <PokeBallImage type={type} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PokeBallDrop;
