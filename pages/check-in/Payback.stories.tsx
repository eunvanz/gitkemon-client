import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockPayback from "~/api/mocks/payback";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Payback from "./Payback.view";

export default {
  title: "pages/보상",
  component: Payback,
  args: {
    user: mockUsers.user,
    availableContributions: 1981,
  },
} as ComponentMeta<typeof Payback>;

const Template: ComponentStory<typeof Payback> = (args) => <Payback {...args} />;

export const 보상전 = createStoryComponent(Template);

export const 로딩중 = createStoryComponent(Template, {
  availableContributions: undefined,
  isLoading: true,
});

export const 보상후_대량 = createStoryComponent(Template, {
  paybackResult: mockPayback.payback,
});

export const 보상후_소량 = createStoryComponent(Template, {
  paybackResult: {
    ...mockPayback.payback,
    basicPokeBalls: 10,
    basicRarePokeBalls: 3,
    rarePokeBalls: 1,
    elitePokeBalls: 0,
    legendPokeBalls: 0,
  },
});
