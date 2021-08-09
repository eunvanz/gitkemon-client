import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AnimatePresence, motion } from "framer-motion";
import random from "lodash/random";
import CountUp from "react-countup";
import Button from "../../components/Button";
import PokeBallImage from "../../components/PokeBallImage";
import Typography from "../../components/Typography";
import { Payback as PaybackType, PokeBallType, User } from "../../types";

dayjs.extend(localizedFormat);

export interface PaybackProps {
  user?: User;
  availableContributions?: number;
  onPayback: VoidFunction;
  isGettingPayback: boolean;
  isLoading: boolean;
  paybackResult?: PaybackType;
}

const Payback: React.FC<PaybackProps> = ({
  user,
  availableContributions,
  onPayback,
  isGettingPayback,
  isLoading,
  paybackResult,
}) => {
  const renderRewardItems = useCallback(() => {
    if (!paybackResult) {
      return null;
    }
    let itemsCnt = 0;
    return [
      "basic" as const,
      "basicRare" as const,
      "rare" as const,
      "elite" as const,
      "legend" as const,
    ].map((type) => {
      const amount = paybackResult[
        `${type}PokeBalls` as keyof typeof paybackResult
      ] as number;
      amount && itemsCnt++;
      return amount > 0 ? (
        <RewardItem type={type} amount={amount} delay={500 * itemsCnt} />
      ) : null;
    });
  }, [paybackResult]);

  const renderRainItems = useCallback(() => {
    if (!paybackResult) {
      return null;
    }
    return (
      <>
        {[
          "basic" as const,
          "basicRare" as const,
          "rare" as const,
          "elite" as const,
          "legend" as const,
        ].map((type) => {
          const amount = paybackResult[
            `${type}PokeBalls` as keyof typeof paybackResult
          ] as number;
          return Array.from({ length: Math.min(amount, 100) }).map((_, index) => (
            <RainItem key={index} type={type} />
          ));
        })}
      </>
    );
  }, [paybackResult]);

  if (!paybackResult) {
    return (
      <div className="min-h-full flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-center text-xl text-gray-600">
              You have made{" "}
              <span className="text-green-600 font-extrabold">
                {isGettingPayback ? (
                  <CountUp
                    start={availableContributions}
                    end={0}
                    duration={0.5}
                    formattingFn={(number) => number.toLocaleString()}
                  />
                ) : (
                  <CountUp
                    end={isLoading ? 0 : availableContributions || 0}
                    duration={1}
                    formattingFn={(number) => number.toLocaleString()}
                  />
                )}
              </span>{" "}
              contributions
            </h2>
            <h3
              className={cx("text-gray-400 text-center font-light", {
                "animate-pulse": isLoading,
              })}
            >
              {!isLoading
                ? `Since ${dayjs(user!.lastPaybackDate).format("lll")}`
                : "Calculating..."}
            </h3>
          </div>
          <div className="mt-8 space-y-6">
            <Button
              onClick={onPayback}
              className="w-full"
              isLoading={isGettingPayback}
              disabled={!availableContributions}
            >
              {!!availableContributions
                ? "Get payback for contributions"
                : "Make more contributions"}
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-full flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mb-1 text-center text-3xl text-green-600">Hooray!!</h2>
            <h2 className="text-center text-xl text-gray-600">You have got</h2>
            {renderRewardItems()}
          </div>
          <div className="mt-8 space-y-6">
            <Button
              onClick={onPayback}
              className="w-full"
              isLoading={isGettingPayback}
              disabled={!availableContributions}
            >
              Go to catch Pokémons
            </Button>
          </div>
        </div>
        {renderRainItems()}
      </div>
    );
  }
};

interface RewardItemProps {
  type: PokeBallType;
  amount: number;
  delay: number;
}

const RewardItem = ({ type, amount, delay }: RewardItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 32 }}
        >
          <div className="flex justify-center items-center mt-3">
            <PokeBallImage type={type} width={30} height={30} />
            <XIcon className="mx-2 w-4 h-4" />
            <Typography
              className="w-14 text-right"
              size="2xl"
              color="primary"
              weight="bold"
            >
              <CountUp
                end={amount}
                duration={1}
                formattingFn={(n) => n.toLocaleString()}
              />
            </Typography>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface RainItemProps {
  type: PokeBallType;
}

const RainItem = ({ type }: RainItemProps) => {
  const rotationClassName = `${random(0, 1) ? "-" : ""}rotate-${random(0, 180)}`;

  const size = random(40, 100);

  const delay = random(0, 3000);

  const left = random(0, window.innerWidth);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }, [delay]);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ position: "absolute", left, top: -200, translateY: 0 }}
          animate={{
            position: "absolute",
            zIndex: 999999,
            left,
            translateY: `${window.innerHeight + 200 + size}px`,
            rotate: random(-360, 360),
            transitionEnd: {
              display: "none",
            },
          }}
          transition={{ ease: "easeIn", duration: 1 }}
        >
          <PokeBallImage
            className={rotationClassName}
            type={type}
            width={size}
            height={size}
          />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Payback;
