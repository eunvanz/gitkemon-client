import cx from "classnames";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CountUp from "react-countup";
import Button from "../../components/Button";
import { Payback as PaybackType, User } from "../../types";

dayjs.extend(localizedFormat);

export interface PaybackProps {
  user?: User;
  availableContributions?: number;
  onDonate: VoidFunction;
  isDonating: boolean;
  isLoading: boolean;
  paybackResult?: PaybackType;
}

const Payback: React.FC<PaybackProps> = ({
  user,
  availableContributions,
  onDonate,
  isDonating,
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
              onClick={onDonate}
              className="w-full"
              isLoading={isDonating}
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
    // TODO: 기부 후 결과
    return null;
  }
};

export default Payback;
