import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Alert from "./Alert";

export default {
  title: "components/Alert",
  component: Alert,
  args: {
    type: "success",
    title: "Title",
    children: "Content",
    hasIcon: true,
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const 기본 = createStoryComponent(Template);
