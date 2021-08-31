import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Tabs from "./Tabs";

export default {
  title: "components/Tabs",
  component: Tabs,
  args: {
    labels: [
      {
        name: "Label 1",
      },
      {
        name: "Label 2",
        count: 10,
      },
      {
        name: "Label 3",
      },
    ],
    activeIndex: 1,
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const 기본 = createStoryComponent(Template);
