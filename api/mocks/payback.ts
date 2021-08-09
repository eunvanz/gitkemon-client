import { Payback } from "../../types";

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

const mockPayback = {
  payback,
};

export default mockPayback;
