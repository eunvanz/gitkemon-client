import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Contents from "./Contents.view";

export default {
  title: "pages/admin/Contents/List",
  component: Contents,
  args: {
    contentType: "notice",
    contents: [],
  },
} as ComponentMeta<typeof Contents>;

const Template: ComponentStory<typeof Contents> = (args) => <Contents {...args} />;

export const Default = createStoryComponent(Template);
