import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ReferralGauge from "./ReferralGauge";

export default {
  title: "components/ReferralGauge",
  component: ReferralGauge,
  args: {
    count: 40,
  },
} as ComponentMeta<typeof ReferralGauge>;

const Template: ComponentStory<typeof ReferralGauge> = (args) => (
  <ReferralGauge {...args} />
);

export const Default = createStoryComponent(Template);
