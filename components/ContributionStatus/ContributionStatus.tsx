import { useMemo } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckIcon } from "@heroicons/react/outline";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { signInWithGithub } from "~/helpers/projectHelpers";
import ROUTES from "~/paths";
import { Payback, User } from "~/types";
import Button from "../Button";
import Typography from "../Typography";

export interface ContributionStatusProps {
  lastPayback?: Payback;
  availableContributions?: number;
  user?: User;
}

const ContributionStatus: React.FC<ContributionStatusProps> = ({
  user,
  lastPayback,
  availableContributions,
}) => {
  const hasCheckedInToday = useMemo(() => {
    if (!lastPayback) return false;
    return dayjs(lastPayback?.paybackDateString).isSame(dayjs(), "day");
  }, [lastPayback]);

  const hasCheckedInYesterday = useMemo(() => {
    if (!lastPayback) return false;
    return dayjs(lastPayback?.paybackDateString).add(1, "day").isSame(dayjs(), "day");
  }, [lastPayback]);

  const router = useRouter();

  return user ? (
    <div className="border rounded-md flex flex-col md:flex-row justify-between items-center p-4">
      <div className="flex flex-col mb-4 md:mb-0">
        <Typography as="div" className="mb-2">
          You&apos;ve checked in with total{" "}
          <Typography color="primary">
            {user?.lastContributions.toLocaleString()}
          </Typography>{" "}
          contributions.
        </Typography>
        {hasCheckedInToday && (
          <Typography as="div" className="mb-2">
            You&apos;ve checked in today
            {lastPayback!.daysInARow ? (
              <>
                {" "}
                <Typography color="primary">
                  {lastPayback!.daysInARow.toLocaleString()}
                </Typography>{" "}
                days in a row.👏👏👏
              </>
            ) : (
              "."
            )}
          </Typography>
        )}
        {hasCheckedInYesterday && lastPayback!.daysInARow && (
          <Typography as="div" className="mb-2">
            You can make{" "}
            <Typography color="primary">{lastPayback!.daysInARow + 1}</Typography> days in
            a row check-in today.😀
          </Typography>
        )}
        {availableContributions ? (
          <Typography as="div">
            You have <Typography color="primary">{availableContributions}</Typography>{" "}
            available contributions to check-in!👉👉
          </Typography>
        ) : (
          <Typography as="div">You have no contributions to check-in yet.😢</Typography>
        )}
      </div>
      <Button
        icon={CheckIcon}
        disabled={!availableContributions}
        onClick={() => router.push(ROUTES.PAYBACK)}
        className="w-full md:w-auto"
      >
        Check in
      </Button>
    </div>
  ) : (
    <div className="border rounded-md flex flex-col p-4 justify-center items-center">
      <Typography as="h1" size="xl" weight="bold" className="text-center mt-4 mb-8">
        Make your Github <Typography color="green">contributions</Typography> more
        valuable💎
      </Typography>
      <button
        onClick={signInWithGithub}
        className="group relative w-60 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 mb-4"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <FontAwesomeIcon
            className="h-5 w-5 text-gray-400 group-hover:text-gray-200"
            icon={faGithub}
          />
        </span>
        Sign in with Github
      </button>
    </div>
  );
};

export default ContributionStatus;
