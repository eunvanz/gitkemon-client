import type { ComponentStory, ComponentMeta } from "@storybook/react";
import dayjs from "dayjs";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import mockPayback from "~/api/mocks/payback";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContributionStatus from "./ContributionStatus";

export default {
  title: "components/ContributionStatus",
  component: ContributionStatus,
  args: {
    user: mockUsers.user,
    availableContributions: 24,
    lastPayback: mockPayback.payback,
  },
  decorators: [withMockRouter()],
} as ComponentMeta<typeof ContributionStatus>;

const Template: ComponentStory<typeof ContributionStatus> = (args) => (
  <ContributionStatus {...args} />
);

export const Default = createStoryComponent(Template);

export const CheckedInYesterday = createStoryComponent(Template, {
  lastPayback: {
    ...mockPayback.payback,
    paybackDateString: dayjs().subtract(1, "day").format("YYYY-MM-DD") as string,
  },
});

export const CheckedInToday = createStoryComponent(Template, {
  lastPayback: {
    ...mockPayback.payback,
    paybackDateString: dayjs().format("YYYY-MM-DD") as string,
  },
});

export const NoAvailableContributions = createStoryComponent(Template, {
  availableContributions: 0,
});

export const NotLoggedIn = createStoryComponent(Template, {
  user: undefined,
});
