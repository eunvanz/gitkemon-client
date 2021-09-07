import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import TopProgressBar from "./TopProgressBar";

export default {
  title: "components/TopProgressBar",
  component: TopProgressBar,
  args: {
    isFinished: false,
    progress: 0,
  },
} as ComponentMeta<typeof TopProgressBar>;

const Template: ComponentStory<typeof TopProgressBar> = (args) => (
  <TopProgressBar {...args} />
);

export const Default = createStoryComponent(Template);
