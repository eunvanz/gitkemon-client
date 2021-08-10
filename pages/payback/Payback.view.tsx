import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { CheckIcon, RefreshIcon, XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AnimatePresence, motion } from "framer-motion";
import random from "lodash/random";
import CountUp from "react-countup";
import Button from "../../components/Button";
import PokeBallCount from "../../components/PokeBallCount";
import PokeBallImage from "../../components/PokeBallImage";
import Typography from "../../components/Typography";
import { getMultiplesCountBetween } from "../../helpers/commonHelpers";
import { Payback as PaybackType, PokeBallType, User } from "../../types";

dayjs.extend(localizedFormat);

export interface PaybackProps {
  user?: User;
  availableContributions?: number;
  onPayback: VoidFunction;
  isGettingPayback: boolean;
  isLoading: boolean;
  paybackResult?: PaybackType;
  onRefresh: VoidFunction;
}

const Payback: React.FC<PaybackProps> = ({
  user,
  availableContributions,
  onPayback,
  isGettingPayback,
  isLoading,
  paybackResult,
  onRefresh,
}) => {
  const renderRewardItems = useCallback(() => {
    if (!paybackResult) {
      return null;
    }
    let itemsCnt = 0;
    const result = [
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

    if (paybackResult.hasContributionsCountReward) {
      const { totalContributions, contributions } = paybackResult;
      const beforeTotalContributions = totalContributions - contributions;
      [3, 10, 200, 500].forEach((commits) => {
        const bonusCnt = getMultiplesCountBetween(
          commits,
          beforeTotalContributions,
          totalContributions,
        );
        if (bonusCnt) {
          result.push(
            <BonusItem>
              You&apos;ve got{" "}
              <Typography color="primary" className="mx-1">
                {bonusCnt}
              </Typography>{" "}
              of every{" "}
              <Typography color="green" className="mx-1">
                {commits}
              </Typography>{" "}
              commits bonus!
            </BonusItem>,
          );
        }
      });
    }

    return result;
  }, [paybackResult]);

  const renderRainItems = useCallback(() => {
    if (!paybackResult) {
      return null;
    }

    const result = [
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
    });
    return result;
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
                : "Loading..."}
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
          <div className="text-center">
            <a
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-sm"
            >
              <RefreshIcon className="h-3 w-3 inline mr-1" />
              Refresh
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-full flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {paybackResult.daysInARow > 1 && (
              <Typography className="text-center mb-1" as="p" color="hint">
                <Typography color="primary">
                  {paybackResult.daysInARow.toLocaleString()}
                </Typography>{" "}
                DAYS IN A ROW
              </Typography>
            )}
            <h2 className="mb-1 text-center text-3xl text-green-600">Hooray!!</h2>
            <h2 className="text-center text-xl text-gray-600">You&apos;ve got</h2>
            {renderRewardItems()}
          </div>
          <div className="mt-8 space-y-6">
            <Button onClick={onPayback} className="w-full">
              Go to catch Pokémons
            </Button>
          </div>
          <div className="text-center">
            <a
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-sm"
            >
              <RefreshIcon className="h-3 w-3 inline mr-1" />
              Refresh
            </a>
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
          <PokeBallCount type={type} amount={amount} hasStaticWidth hasToCountUp />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface RainItemProps {
  type: PokeBallType;
}

const RainItem = ({ type }: RainItemProps) => {
  const rotationClassName = useMemo(
    () => `${random(0, 1) ? "-" : ""}rotate-${random(0, 180)}`,
    [],
  );

  const size = useMemo(() => random(20, 80), []);

  const delay = useMemo(() => random(0, 3000), []);

  const left = useMemo(() => random(0, window.innerWidth - size), [size]);

  return createPortal(
    <motion.div
      initial={{ position: "absolute", left, top: -size, translateY: 0 }}
      animate={{
        position: "absolute",
        zIndex: 999999,
        left,
        translateY: `${window.innerHeight + size}px`,
        rotate: random(-360, 360),
        transitionEnd: {
          display: "none",
        },
      }}
      transition={{ ease: "easeIn", duration: 1, delay: delay / 1000 }}
    >
      <PokeBallImage
        className={rotationClassName}
        type={type}
        width={size}
        height={size}
      />
    </motion.div>,
    document.body,
  );
};

interface BonusItemProps {
  children: React.ReactNode;
}

const BonusItem = ({ children }: BonusItemProps) => {
  return (
    <div className="flex justify-center items-center">
      <CheckIcon className="text-green-600 w-6 mr-2" /> {children}
    </div>
  );
};

export default Payback;
