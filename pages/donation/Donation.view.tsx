import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CountUp from "react-countup";
import { User } from "../../types";

dayjs.extend(localizedFormat);

export interface DonationProps {
  user: User;
  availableContributions: number;
  onDonate: VoidFunction;
}

const Donation: React.FC<DonationProps> = ({
  user,
  availableContributions,
  onDonate,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-xl text-gray-600">
            You have made{" "}
            <span className="text-green-600 font-extrabold">
              <CountUp
                end={availableContributions}
                duration={3}
                formattingFn={(number) => number.toLocaleString()}
              />
            </span>{" "}
            contributions
            <br /> since {dayjs(user.lastDonationDate).format("lll")}.
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={onDonate}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600"
          >
            Donate contributions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donation;
