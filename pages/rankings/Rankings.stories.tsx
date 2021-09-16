import { action } from "@storybook/addon-actions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Rankings from "./Rankings.view";

export default {
  title: "pages/Rankings",
  component: Rankings,
  args: {
    onChangeTab: action("onChangeTab"),
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof Rankings>;

const Template: ComponentStory<typeof Rankings> = (args) => <Rankings {...args} />;

export const Collection = createStoryComponent(Template, {
  activeTabIndex: 0,
});

export const Contribution = createStoryComponent(Template, {
  activeTabIndex: 1,
});

export const Pokemon = createStoryComponent(Template, {
  activeTabIndex: 2,
});
