import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import PokeBallCount from "./PokeBallCount";

export default {
  title: "components/PokeBallCount",
  component: PokeBallCount,
  args: {
    type: "basic",
    amount: 19184,
  },
} as ComponentMeta<typeof PokeBallCount>;

const Template: ComponentStory<typeof PokeBallCount> = (args) => (
  <PokeBallCount {...args} />
);

export const 기본 = createStoryComponent(Template);
