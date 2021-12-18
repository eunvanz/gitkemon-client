import { XIcon } from "@heroicons/react/outline";
import cx from "classnames";
import CountUp from "react-countup";
import { PokeBallType } from "~/types";
import PokeBallImage from "../PokeBallImage";
import Typography from "../Typography";

export interface PokeBallCountProps {
  type: PokeBallType;
  amount: number;
  hasToCountUp?: boolean;
  hasStaticWidth?: boolean;
}

const PokeBallCount: React.FC<PokeBallCountProps> = ({
  type,
  amount,
  hasToCountUp,
  hasStaticWidth,
}) => {
  return (
    <div className="flex justify-center items-center mt-3">
      <PokeBallImage type={type} width={30} height={30} />
      <XIcon className="mx-2 w-4 h-4" />
      <Typography
        className={cx("text-right", { "w-14": hasStaticWidth })}
        size="2xl"
        color="primary"
        weight="bold"
      >
        {hasToCountUp ? (
          <CountUp end={amount} duration={1} formattingFn={(n) => n.toLocaleString()} />
        ) : (
          amount.toLocaleString()
        )}
      </Typography>
    </div>
  );
};

export default PokeBallCount;
