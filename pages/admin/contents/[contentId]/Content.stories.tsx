import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Content from "./Content.view";

export default {
  title: "pages/admin/Contents/Edit",
  component: Content,
  args: {},
} as ComponentMeta<typeof Content>;

const Template: ComponentStory<typeof Content> = (args) => <Content {...args} />;

export const Write = createStoryComponent(Template);
