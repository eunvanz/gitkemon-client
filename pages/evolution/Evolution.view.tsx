import { useCallback, useEffect, useRef, useState } from "react";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Button from "~/components/Button";
import Confetti from "~/components/Confetti/Confetti";
import EvolutionCard from "~/components/EvolutionCard";
import Loading from "~/components/Loading";
import MonCard from "~/components/MonCard";
import MonCardGrid from "~/components/MonCardGrid";
import Typography from "~/components/Typography";
import { delayPromise } from "~/helpers/commonHelpers";
import {
  checkIsLuckyHuntResult,
  convertMonToCardMon,
  convertMonToModalMon,
  showHuntResultMessages,
} from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { Collection, HuntResult, Mon, User } from "~/types";

export interface EvolutionProps {
  result?: HuntResult;
  evolveMon?: Collection;
  nextMons?: Mon[];
  onSelectNextMon: (monId: number) => void;
  onNavigateToMyCollection: VoidFunction;
  user?: User;
}

const Evolution: React.FC<EvolutionProps> = ({
  result,
  evolveMon,
  nextMons,
  onNavigateToMyCollection,
  onSelectNextMon,
  user,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const [isMonSelectVisible, setIsMonSelectVisible] = useState(false);

  const [isCardVisible, setIsCardVisible] = useState(false);

  const [isGotchaVisible, setIsGotchaVisible] = useState(false);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const [isConfettiVisible, setIsConfettiVisible] = useState(false);

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
    if (result) {
      setIsMonSelectVisible(false);
      setIsCardVisible(true);
    }
  }, [proceedResultAnim, result]);

  useEffect(() => {
    if (nextMons && nextMons.length > 1) {
      setIsMonSelectVisible(true);
    }
  }, [nextMons]);

  const router = useRouter();

  useEffect(() => {
    if (!evolveMon || !user) {
      router.replace(ROUTES.HOME);
    }
  }, [evolveMon, router, user]);

  useEffect(() => {
    setIsMonSelectVisible(false);
    setIsCardVisible(false);
    setIsGotchaVisible(false);
    setIsButtonVisible(false);
    setIsConfettiVisible(false);
  }, [evolveMon]);

  return nextMons && evolveMon && user ? (
    <div
      className={cx(
        isMonSelectVisible && nextMons.length > 6 ? "block md:flex" : "flex",
        "py-4 flex-col justify-center items-center content-container-no-footer",
      )}
    >
      <Confetti isVisible={isConfettiVisible} />
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
              <Typography as="h2" size="3xl" color="primary" weight="bold">
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
        {isCardVisible && result && (
          <motion.div
            ref={resultRef}
            className="w-full"
            initial={{
              position: "absolute",
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <EvolutionCard
              evolveMon={evolveMon}
              result={result}
              onFinish={proceedResultAnim}
              user={user}
            />
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <Loading isFullHeight />
  );
};

export default Evolution;
