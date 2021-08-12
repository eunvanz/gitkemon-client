import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Hunt from "./Hunt.view";

export default {
  title: "pages/포켓몬사냥",
  component: Hunt,
  args: {
    pokeBalls: [
      {
        type: "basic",
        amount: 114,
      },
      {
        type: "basicRare",
        amount: 14,
      },
      {
        type: "rare",
        amount: 4,
      },
      {
        type: "elite",
        amount: 1,
      },
      {
        type: "legend",
        amount: 1,
      },
    ],
  },
} as ComponentMeta<typeof Hunt>;

const Template: ComponentStory<typeof Hunt> = (args) => <Hunt {...args} />;

export const 기본 = createStoryComponent(Template);
