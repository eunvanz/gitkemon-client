import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import PokeBallDrop from "./PokeBallDrop";

export default {
  title: "components/PokeBallDrop",
  component: PokeBallDrop,
  args: {
    type: "basic",
  },
} as ComponentMeta<typeof PokeBallDrop>;

const Template: ComponentStory<typeof PokeBallDrop> = (args) => (
  <PokeBallDrop {...args} />
);

export const 기본 = createStoryComponent(Template);
