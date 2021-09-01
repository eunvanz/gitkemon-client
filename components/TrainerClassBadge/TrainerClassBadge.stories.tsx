import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import TrainerClassBadge from "./TrainerClassBadge";

export default {
  title: "components/TrainerClassBadge",
  component: TrainerClassBadge,
  args: {
    trainerClass: 1,
  },
} as ComponentMeta<typeof TrainerClassBadge>;

const Template: ComponentStory<typeof TrainerClassBadge> = (args) => (
  <TrainerClassBadge {...args} />
);

export const 기본 = createStoryComponent(Template);
