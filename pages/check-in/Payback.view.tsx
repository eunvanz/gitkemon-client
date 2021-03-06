import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { RefreshIcon, XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { AnimatePresence, motion } from "framer-motion";
import random from "lodash/random";
import Image from "next/image";
import CountUp from "react-countup";
import Button from "~/components/Button";
import Footer from "~/components/Footer";
import PokeBallCount from "~/components/PokeBallCount";
import PokeBallImage from "~/components/PokeBallImage";
import Typography from "~/components/Typography";
import { getMultiplesCountBetween } from "~/helpers/commonHelpers";
import { Payback as PaybackType, PokeBallType, User } from "~/types";
import contributionsImage from "~/public/images/contributions-check.png";

dayjs.extend(localizedFormat);

export interface PaybackProps {
  user?: User;
  availableContributions?: number;
  onPayback: VoidFunction;
  isGettingPayback: boolean;
  isLoading: boolean;
  paybackResult?: PaybackType;
  onRefresh: VoidFunction;
  onGetPokémons: VoidFunction;
}

const Payback: React.FC<PaybackProps> = ({
  user,
  availableContributions,
  onPayback,
  isGettingPayback,
  isLoading,
  paybackResult,
  onRefresh,
  onGetPokémons,
}) => {
  const renderRewardItems = useCallback(() => {
    if (!paybackResult) {
      return null;
    }
    let itemsCnt = 0;
    const result = [];
    [
      "basic" as const,
      "basicRare" as const,
      "rare" as const,
      "elite" as const,
      "legend" as const,
    ].forEach((type) => {
      const amount = paybackResult[
        `${type}PokeBalls` as keyof typeof paybackResult
      ] as number;
      amount && itemsCnt++;
      if (amount) {
        result.push(
          <RewardItem key={type} type={type} amount={amount} delay={500 * itemsCnt} />,
        );
      }
    });

    const bonusItems = [];
    if (paybackResult.hasContributionsCountReward) {
      const { totalContributions, contributions } = paybackResult;
      const beforeTotalContributions = totalContributions - contributions;
      [3, 20, 500, 1000].forEach((contributions) => {
        const bonusCnt = getMultiplesCountBetween(
          contributions,
          beforeTotalContributions + 1,
          totalContributions,
        );
        if (bonusCnt) {
          bonusItems.push(
            <BonusItem
              key={contributions}
              title={`Every ${contributions} contributions bonus`}
              amount={bonusCnt}
            />,
          );
        }
      });
    }
    if (paybackResult.hasDaysInARowReward) {
      bonusItems.push(
        <BonusItem
          key="daysInARow"
          title={`${paybackResult.daysInARow} days in a row payback bonus`}
          amount={1}
        />,
      );
    }

    if (bonusItems.length) {
      result.push(
        <BonusSection key="bonusInfo" delay={500 + result.length * 500}>
          {bonusItems}
        </BonusSection>,
      );
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

  const [isHelpVisible, setIsHelpVisible] = useState(false);

  if (!paybackResult) {
    return (
      <>
        <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 content-container">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="text-center text-xl text-gray-600">
                You&apos;ve made{" "}
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
                  ? `Since ${dayjs(
                      user!.lastPaybackDate || user!.contributionBaseDate,
                    ).format("lll")}`
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
                  ? "Check in to get payback"
                  : "Make more contributions"}
              </Button>
            </div>
            <div className="text-center">
              <RefreshButton onRefresh={onRefresh} isRefreshing={isLoading} />
            </div>
            <div className="text-center">
              <AnimatePresence>
                {isHelpVisible ? (
                  <motion.div
                    initial={{ height: 0, overflow: "hidden" }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                  >
                    <Typography>
                      Visit{" "}
                      <a
                        href={`${process.env.GITHUB_URL}/settings/profile`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        your github settings
                      </a>{" "}
                      and check
                      <br />
                      <Typography weight="extrabold">
                        Include private contributions on my profile
                      </Typography>{" "}
                      like below.
                    </Typography>
                    <div className="text-center mt-4">
                      <Image src={contributionsImage} width={400} height={90} alt="" />
                    </div>
                  </motion.div>
                ) : (
                  <a
                    onClick={() => setIsHelpVisible(true)}
                    className={cx(
                      "h-3 w-3 font-light inline mr-1 text-gray-400 hover:text-gray-600",
                    )}
                  >
                    Can&apos;t you see private contributions?
                  </a>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden content-container">
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
              <h2 className="mb-1 text-center text-3xl text-green-600">🎉 Hooray!!</h2>
              <h2 className="text-center text-2xl text-gray-600">You got</h2>
              {renderRewardItems()}
            </div>
            <div className="mt-8 space-y-6">
              <Button className="w-full" onClick={onGetPokémons}>
                Go to get Pokémons
              </Button>
            </div>
            <div className="text-center">
              <Typography color="hint" weight="light">
                You&apos;ve made{" "}
                <Typography color="green">
                  {paybackResult.totalContributions.toLocaleString()}
                </Typography>{" "}
                contributions since {dayjs(user!.contributionBaseDate).format("LLL")}
              </Typography>
            </div>
            <div className="text-center">
              <RefreshButton onRefresh={onRefresh} isRefreshing={isLoading} />
            </div>
          </div>
          {renderRainItems()}
        </div>
        <Footer />
      </>
    );
  }
};

interface RefreshButtonProps {
  onRefresh: VoidFunction;
  isRefreshing: boolean;
}

const RefreshButton = ({ onRefresh, isRefreshing }: RefreshButtonProps) => {
  return (
    <a
      onClick={onRefresh}
      className={cx("h-3 w-3 inline mr-1 text-gray-400 hover:text-gray-600")}
    >
      <RefreshIcon
        className={cx("h-3 w-3 inline mr-1", { "animate-spin": isRefreshing })}
      />
      Refresh
    </a>
  );
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
          animate={{ opacity: 1, height: "auto" }}
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
  const size = useMemo(() => random(40, 80), []);

  const delay = useMemo(() => random(0, 3000), []);

  const left = useMemo(() => random(0, window.innerWidth - size), [size]);

  return createPortal(
    <motion.div
      initial={{
        position: "absolute",
        left,
        top: -size,
        translateY: "-50px",
        width: size,
        height: size,
        zIndex: 999999,
      }}
      animate={{
        translateY: `${window.innerHeight + size + 50}px`,
        transitionEnd: {
          display: "none",
        },
        rotate: random(-360, 360),
      }}
      transition={{ ease: "easeIn", duration: 1, delay: delay / 1000 }}
    >
      <PokeBallImage type={type} width="100%" height="100%" />
    </motion.div>,
    document.body,
  );
};

interface BonusItemProps {
  amount: number;
  title: string;
}

const BonusItem = ({ title, amount }: BonusItemProps) => {
  return (
    <div className="text-center w-full mb-1">
      🏆 {title} <XIcon className="w-3 inline" />{" "}
      <Typography color="primary">{amount}</Typography>
    </div>
  );
};

interface BonusSectionProps {
  delay: number;
}

const BonusSection: React.FC<BonusSectionProps> = ({ delay, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className={`rounded-md bg-green-50 p-4`}>
            <div className="text-center">
              <div className="ml-3">
                <h3 className={`text-sm font-medium text-green-800`}>
                  💡 It&apos;s including some special bonus!
                </h3>
                <div className={`text-green-700`}>{children}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Payback;
