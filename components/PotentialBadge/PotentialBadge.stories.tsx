import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import PotentialBadge from "./PotentialBadge";

export default {
  title: "components/PotentialBadge",
  component: PotentialBadge,
  args: {
    potential: "SS",
  },
} as ComponentMeta<typeof PotentialBadge>;

const Template: ComponentStory<typeof PotentialBadge> = (args) => (
  <PotentialBadge {...args} />
);

export const 기본 = createStoryComponent(Template);
