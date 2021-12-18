import { Payback, PaybackLog } from "~/types";

const payback: Payback = {
  id: 1,
  userId: "mockUserId",
  contributions: 600,
  totalContributions: 600,
  daysInARow: 3,
  basicPokeBalls: 600,
  basicRarePokeBalls: 200,
  rarePokeBalls: 60,
  elitePokeBalls: 3,
  legendPokeBalls: 1,
  paybackDateString: "2021-07-31",
  hasContributionsCountReward: true,
  hasDaysInARowReward: true,
};

const history: PaybackLog[] = [
  {
    date: "2021-08-10",
    totalContributions: 679,
  },
  {
    date: "2021-08-11",
    totalContributions: 698,
  },
  {
    date: "2021-08-12",
    totalContributions: 711,
  },
  {
    date: "2021-08-13",
    totalContributions: 721,
  },
  {
    date: "2021-08-14",
    totalContributions: 736,
  },
  {
    date: "2021-08-15",
    totalContributions: 764,
  },
  {
    date: "2021-08-16",
    totalContributions: 781,
  },
  {
    date: "2021-08-17",
    totalContributions: 791,
  },
  {
    date: "2021-08-18",
    totalContributions: 799,
  },
  {
    date: "2021-08-19",
    totalContributions: 810,
  },
  {
    date: "2021-08-20",
    totalContributions: 819,
  },
  {
    date: "2021-08-21",
    totalContributions: 852,
  },
  {
    date: "2021-08-22",
    totalContributions: 894,
  },
  {
    date: "2021-08-23",
    totalContributions: 904,
  },
  {
    date: "2021-08-24",
    totalContributions: 915,
  },
  {
    date: "2021-08-25",
    totalContributions: 923,
  },
  {
    date: "2021-08-26",
    totalContributions: 931,
  },
  {
    date: "2021-08-28",
    totalContributions: 969,
  },
  {
    date: "2021-08-29",
    totalContributions: 997,
  },
  {
    date: "2021-08-30",
    totalContributions: 1016,
  },
  {
    date: "2021-08-31",
    totalContributions: 1020,
  },
  {
    date: "2021-09-01",
    totalContributions: 1045,
  },
  {
    date: "2021-09-02",
    totalContributions: 1071,
  },
];

const mockPayback = {
  payback,
  history,
};

export default mockPayback;
