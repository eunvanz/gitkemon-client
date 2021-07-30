import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Badge from "./Badge";

export default {
  title: "components/Badge",
  component: Badge,
  args: {
    label: "Label",
    color: "blue",
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const 기본 = createStoryComponent(Template);

export const 큰사이즈 = createStoryComponent(Template, {
  size: "lg",
});