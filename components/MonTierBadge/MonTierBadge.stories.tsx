import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import MonTierBadge from "./MonTierBadge";

export default {
  title: "components/MonTierBadge",
  component: MonTierBadge,
  args: {
    tier: "basic",
  },
} as ComponentMeta<typeof MonTierBadge>;

const Template: ComponentStory<typeof MonTierBadge> = (args) => (
  <MonTierBadge {...args} />
);

export const 기본 = createStoryComponent(Template);
