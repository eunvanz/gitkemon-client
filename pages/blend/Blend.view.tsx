import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlendCard from "~/components/BlendCard";
import Button from "~/components/Button";
import Confetti from "~/components/Confetti/Confetti";
import Loading from "~/components/Loading";
import Typography from "~/components/Typography";
import { delayPromise } from "~/helpers/commonHelpers";
import { checkIsLuckyHuntResult, showHuntResultMessages } from "~/helpers/projectHelpers";
import { Collection, HuntResult, User } from "~/types";

export interface BlendProps {
  blendMons: Collection[];
  result?: HuntResult;
  onNavigateToMyCollection: VoidFunction;
  user: User;
}

const Blend: React.FC<BlendProps> = ({
  blendMons,
  result,
  onNavigateToMyCollection,
  user,
}) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const [isGotchaVisible, setIsGotchaVisible] = useState(false);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

  const monCardRef = useRef<HTMLDivElement>(null);

  const proceedResultAnim = useCallback(async () => {
    await delayPromise(500);
    if (checkIsLuckyHuntResult(result!)) {
      setIsConfettiVisible(true);
    }
    setIsGotchaVisible(true);
    setIsButtonVisible(true);
    showHuntResultMessages(result!);
  }, [result]);

  useEffect(() => {
    result && setIsCardVisible(true);
  }, [result]);

  return result ? (
    <div className="flex flex-col justify-center items-center content-container">
      <Confetti isVisible={isConfettiVisible} />
      <AnimatePresence>
        {isCardVisible && (
          <motion.div
            ref={monCardRef}
            className="w-full"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <BlendCard
              blendMons={blendMons}
              result={result}
              onFinish={proceedResultAnim}
              user={user}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isButtonVisible && (
          <motion.div
            className="flex-0 justify-center p-4 text-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <Button color="primary" onClick={onNavigateToMyCollection}>
              My collection
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isGotchaVisible && (
          <motion.div
            className={"absolute flex justify-center"}
            initial={{
              top: monCardRef.current!.getClientRects()[0].top - 150,
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
