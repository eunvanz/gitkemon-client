import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import PokeBallQuantity from "./PokeBallQuantity";

export default {
  title: "components/PokeBallQuantity",
  component: PokeBallQuantity,
  args: {
    pokeBall: {
      type: "legend",
      amount: 20,
    },
  },
} as ComponentMeta<typeof PokeBallQuantity>;

const Template: ComponentStory<typeof PokeBallQuantity> = (args) => (
  <PokeBallQuantity {...args} />
);

export const 기본 = createStoryComponent(Template);
