import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CountUp from "react-countup";
import Button from "../../components/Button";
import { Donation as DonationType, User } from "../../types";

dayjs.extend(localizedFormat);

export interface DonationProps {
  user?: User;
  availableContributions?: number;
  onDonate: VoidFunction;
  isDonating: boolean;
  isLoading: boolean;
  donationResult?: DonationType;
}

const Donation: React.FC<DonationProps> = ({
  user,
  availableContributions,
  onDonate,
  isDonating,
  isLoading,
  donationResult,
}) => {
  if (!donationResult) {
    return !isLoading ? (
      <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-xl text-gray-600">
              You have made{" "}
              <span className="text-green-600 font-extrabold">
                <CountUp
                  end={availableContributions!}
                  duration={3}
                  formattingFn={(number) => number.toLocaleString()}
                />
              </span>{" "}
              contributions
              <br /> since {dayjs(user!.lastDonationDate).format("lll")}.
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <Button onClick={onDonate} className="w-full" isLoading={isDonating}>
              Donate contributions
            </Button>
          </div>
        </div>
      </div>
    ) : null;
  } else {
    // TODO: 기부 후 결과
    return null;
  }
};

export default Donation;
