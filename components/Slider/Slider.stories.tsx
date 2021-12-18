import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Slider from "./Slider";

export default {
  title: "components/Slider",
  component: Slider,
  args: {
    min: 0,
    max: 100,
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const 기본 = createStoryComponent(Template);
