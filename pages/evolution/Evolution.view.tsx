import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Button from "../../components/Button";
import HuntResultItem from "../../components/HuntResultItem";
import Typography from "../../components/Typography";
import { colorHashes } from "../../constants/styles";
import { Collection, HuntResult, Mon } from "../../types";

export interface EvolutionProps {
  result?: HuntResult;
  evolveMon: Collection;
  nextMons?: Mon[];
  onSelectNextMon: (monId: number) => void;
  onNavigateToMyCollection: VoidFunction;
}

const Evolution: React.FC<EvolutionProps> = ({
  result,
  evolveMon,
  nextMons,
  onNavigateToMyCollection,
}) => {
  const monImageRef = useRef<HTMLDivElement>(null);

  const burstInterval = useRef<number | null>(null);

  const [isMonImageVisible, setIsMonImageVisible] = useState(true);

  const [isCardFlipped, setIsCardFlipped] = useState(true);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const initBurstEffect = useCallback(async () => {
    const { burstStar } = await import("../../helpers/animations");
    const burst = () => {
      const { left, top } = monImageRef.current!.getClientRects()[0];
      burstStar({
        top: top + 100,
        left: left + 100,
        color: [
          colorHashes.PSYCHIC,
          colorHashes.ICE,
          colorHashes.ELECTRIC,
          colorHashes.GRASS,
          colorHashes.FLYING,
        ],
        count: 20,
        radius: { 50: 150 },
        duration: 2000,
        shape: "circle",
        delay: "stagger(0, 100)",
      });
    };
    burst();
    burstInterval.current = window.setInterval(burst, 500);
  }, []);

  useEffect(() => {
    initBurstEffect();
    return () => {
      burstInterval.current && clearInterval(burstInterval.current);
    };
  }, [initBurstEffect]);

  useEffect(() => {
    if (result) {
      setTimeout(() => {
        setIsMonImageVisible(false);
      }, 3000);
      setTimeout(() => {
        setIsCardFlipped(false);
        clearInterval(burstInterval.current!);
      }, 3500);
      setTimeout(() => {
        setIsButtonVisible(true);
      }, 4000);
    }
  }, [result]);

  return (
    <div className="flex flex-col justify-center items-center content-container">
      <AnimatePresence>
        {!isMonImageVisible && isCardFlipped && (
          <motion.div
            className={"top-40 absolute flex justify-center"}
            initial={{
              transform: "scale(0%)",
            }}
            animate={{
              transform: "scale(100%)",
            }}
            exit={{
              opacity: 0,
              transition: {
                type: "tween",
              },
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
        {isMonImageVisible && (
          <motion.div exit={{ opacity: 0 }}>
            <div ref={monImageRef} className="flex justify-center animate-pulse">
              <Image
                src={evolveMon.monImageUrl}
                quality={100}
                width={200}
                height={200}
                alt=""
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isMonImageVisible && result && (
          <motion.div
            className="flex flex-col justify-center items-center w-full max-w-screen-lg m-auto"
            initial={{
              position: "absolute",
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <HuntResultItem huntResult={result} isRevealed={!isCardFlipped} isSingle />
            <AnimatePresence>
              {isButtonVisible && (
                <motion.div
                  className="flex-0 justify-center p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <Button color="primary" onClick={onNavigateToMyCollection}>
                    My collection
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Evolution;
