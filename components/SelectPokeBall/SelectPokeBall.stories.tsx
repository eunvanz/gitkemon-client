import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import SelectPokeBall from "./SelectPokeBall";

export default {
  title: "components/SelectPokeBall",
  component: SelectPokeBall,
  args: {
    pokeBalls: [
      {
        type: "basic",
        amount: 4,
      },
      {
        type: "basicRare",
        amount: 4,
      },
      {
        type: "rare",
        amount: 4,
      },
      {
        type: "elite",
        amount: 4,
      },
      {
        type: "legend",
        amount: 4,
      },
    ],
  },
} as ComponentMeta<typeof SelectPokeBall>;

const Template: ComponentStory<typeof SelectPokeBall> = (args) => (
  <SelectPokeBall {...args} />
);

export const 기본 = createStoryComponent(Template);

export const 하나 = createStoryComponent(Template, {
  pokeBalls: [{ type: "basic", amount: 2412 }],
});
