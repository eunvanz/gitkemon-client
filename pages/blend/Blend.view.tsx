import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../components/Button";
import Confetti from "../../components/Confetti/Confetti";
import HuntResultItem from "../../components/HuntResultItem";
import Loading from "../../components/Loading";
import MonCard from "../../components/MonCard";
import Typography from "../../components/Typography";
import { colorHashes } from "../../constants/styles";
import { delayPromise } from "../../helpers/commonHelpers";
import {
  checkIsLuckyHuntResult,
  convertCollectionToCardMon,
  showHuntResultMessages,
} from "../../helpers/projectHelpers";
import { Collection, HuntResult } from "../../types";

export interface BlendProps {
  blendMons: Collection[];
  result?: HuntResult;
  onNavigateToMyCollection: VoidFunction;
}

const Blend: React.FC<BlendProps> = ({ blendMons, result, onNavigateToMyCollection }) => {
  const [animStep, setAnimStep] = useState<number>(0);

  const monCardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const burstInterval = useRef<number | null>(null);

  const burstEffect = useCallback(async () => {
    const { burstStar } = await import("../../helpers/animations");
    const burst = () => {
      const { left, top, height, width } = monCardRef.current!.getClientRects()[0];
      burstStar({
        top: top + height / 2,
        left: left + width / 2,
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

  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const proceedAnimation = useCallback(async () => {
    burstEffect();
    await delayPromise(2000);
    burstInterval.current && clearInterval(burstInterval.current);
    setAnimStep(1);
    await delayPromise(3000);
    setAnimStep(2);
    await delayPromise(500);
    setAnimStep(3);
    if (checkIsLuckyHuntResult(result!)) {
      setIsConfettiVisible(true);
    }
    await delayPromise(500);
    setAnimStep(4);
    showHuntResultMessages(result!);
  }, [burstEffect, result]);

  useEffect(() => {
    return () => {
      burstInterval.current && clearInterval(burstInterval.current);
    };
  }, []);

  useEffect(() => {
    result && proceedAnimation();
  }, [proceedAnimation, result]);

  return result ? (
    <div className="flex flex-col justify-center items-center content-container">
      <Confetti isVisible={isConfettiVisible} />
      <AnimatePresence>
        {animStep === 0 && (
          <motion.div
            ref={monCardRef}
            className="flex justify-center w-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              rotate: 3600,
              scale: 0,
              transition: {
                duration: 3,
              },
            }}
          >
            {blendMons.map((mon) => (
              <MonCard
                key={mon.id}
                mon={convertCollectionToCardMon(mon)}
                isClickDisabled
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {animStep > 1 && result && (
          <motion.div
            ref={resultRef}
            className="flex flex-col justify-center items-center w-full max-w-screen-lg m-auto"
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: "spring",
            }}
          >
            <HuntResultItem huntResult={result} isRevealed={animStep === 3} isSingle />
            <AnimatePresence>
              {animStep === 4 && (
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
      <AnimatePresence>
        {animStep > 2 && (
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
    </div>
  ) : (
    <Loading isFullHeight />
  );
};

export default Blend;
