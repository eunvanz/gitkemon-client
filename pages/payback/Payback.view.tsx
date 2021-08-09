import { useMemo } from "react";
import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import CountUp from "react-countup";
import Button from "../../components/Button";
import Typography from "../../components/Typography";
import { Payback as PaybackType, User } from "../../types";
import imgBasicRareBall from "../../images/pokeball-basic-rare.png";
import imgBasicBall from "../../images/pokeball-basic.png";
import imgEliteBall from "../../images/pokeball-elite.png";
import imgLegendBall from "../../images/pokeball-legend.png";
import imgRareBall from "../../images/pokeball-rare.png";

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
  if (!paybackResult) {
    return (
      <div className="min-h-full flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-xl text-gray-600">
              You have made{" "}
              <span className="text-green-600 font-extrabold">
                <CountUp
                  end={availableContributions || 0}
                  duration={1}
                  formattingFn={(number) => number.toLocaleString()}
                />
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
            <h2 className="mt-6 text-center text-xl text-gray-600">You have got</h2>
            {paybackResult.basicPokeBalls > 0 && (
              <RewardItem type="basic" amount={paybackResult.basicPokeBalls} />
            )}
            {paybackResult.basicRarePokeBalls > 0 && (
              <RewardItem type="basicRare" amount={paybackResult.basicRarePokeBalls} />
            )}
            {paybackResult.rarePokeBalls > 0 && (
              <RewardItem type="rare" amount={paybackResult.rarePokeBalls} />
            )}
            {paybackResult.elitePokeBalls > 0 && (
              <RewardItem type="elite" amount={paybackResult.elitePokeBalls} />
            )}
            {paybackResult.legendPokeBalls > 0 && (
              <RewardItem type="legend" amount={paybackResult.legendPokeBalls} />
            )}
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
      </div>
    );
  }
};

interface RewardItemProps {
  type: "basic" | "basicRare" | "rare" | "elite" | "legend";
  amount: number;
}

const RewardItem = ({ type, amount }: RewardItemProps) => {
  const img = useMemo(() => {
    switch (type) {
      case "basic":
        return imgBasicBall;
      case "basicRare":
        return imgBasicRareBall;
      case "rare":
        return imgRareBall;
      case "elite":
        return imgEliteBall;
      case "legend":
        return imgLegendBall;
    }
  }, [type]);

  return (
    <div className="flex justify-center items-center mt-3">
      <Image src={img} alt="basic ball" width={30} height={30} />
      <XIcon className="mx-2 w-4 h-4" />
      <Typography className="w-14 text-right" size="2xl" color="primary" weight="bold">
        <CountUp end={amount} duration={1} formattingFn={(n) => n.toLocaleString()} />
      </Typography>
    </div>
  );
};

export default Payback;
