import { useCallback, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Button from "../../components/Button";
import HuntResultItem from "../../components/HuntResultItem";
import Loading from "../../components/Loading";
import MonCard from "../../components/MonCard";
import MonCardGrid from "../../components/MonCardGrid";
import Typography from "../../components/Typography";
import { colorHashes } from "../../constants/styles";
import { delayPromise } from "../../helpers/commonHelpers";
import {
  checkIsLuckyHuntResult,
  convertMonToCardMon,
  convertMonToModalMon,
  showHuntResultMessages,
} from "../../helpers/projectHelpers";
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
  onSelectNextMon,
}) => {
  const { width, height } = useWindowSize();

  const monImageRef = useRef<HTMLDivElement>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const burstInterval = useRef<number | null>(null);

  const [isMonSelectVisible, setIsMonSelectVisible] = useState(false);

  const [isMonImageVisible, setIsMonImageVisible] = useState(false);

  const [isGotchaVisible, setIsGotchaVisible] = useState(false);

  const [isCardFlipped, setIsCardFlipped] = useState(true);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

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
    return () => {
      burstInterval.current && clearInterval(burstInterval.current);
    };
  }, []);

  const proceedAnimation = useCallback(async () => {
    setIsMonSelectVisible(false);
    setIsMonImageVisible(true);
    initBurstEffect();
    await delayPromise(3000);
    setIsMonImageVisible(false);
    await delayPromise(500);
    setIsCardFlipped(false);
    setIsGotchaVisible(true);
    clearInterval(burstInterval.current!);
    if (checkIsLuckyHuntResult(result!)) {
      setIsConfettiVisible(true);
    }
    await delayPromise(500);
    setIsButtonVisible(true);
    showHuntResultMessages(result!);
  }, [initBurstEffect, result]);

  useEffect(() => {
    if (result) {
      proceedAnimation();
    }
  }, [initBurstEffect, proceedAnimation, result]);

  useEffect(() => {
    if (nextMons && nextMons.length > 1) {
      setIsMonSelectVisible(true);
    }
  }, [nextMons]);

  return nextMons ? (
    <div
      className={cx(
        isMonSelectVisible && nextMons.length > 6 ? "block md:flex" : "flex",
        "py-4 flex-col justify-center items-center content-container",
      )}
    >
      {isConfettiVisible && <Confetti width={width} height={height} recycle={false} />}
      <AnimatePresence>
        {isMonSelectVisible && (
          <motion.div
            className="w-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              position: "absolute",
              opacity: 0,
            }}
          >
            <div className="text-center">
              <Typography as="h2" size="3xl" color="primary">
                You have choices!
              </Typography>
            </div>
            <MonCardGrid>
              {nextMons.map((mon) => (
                <MonCard
                  key={mon.id}
                  mon={convertMonToCardMon(mon)}
                  onSelect={() => onSelectNextMon(mon.id)}
                  modalMon={convertMonToModalMon(mon)}
                />
              ))}
            </MonCardGrid>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isGotchaVisible && (
          <motion.div
            className={"absolute flex justify-center"}
            initial={{
              top: resultRef.current!.getClientRects()[0].top - 150,
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
            ref={resultRef}
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
  ) : (
    <Loading isFullHeight />
  );
};

export default Evolution;
