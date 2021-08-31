import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Rankings from "./Rankings.view";

export default {
  title: "pages/Rankings",
  component: Rankings,
  args: {},
  decorators: [withTestProvider],
} as ComponentMeta<typeof Rankings>;

const Template: ComponentStory<typeof Rankings> = (args) => <Rankings {...args} />;

export const 기본 = createStoryComponent(Template);
