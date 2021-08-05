import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import AdminBaseLayout from "./AdminBaseLayout";

export default {
  title: "components/AdminBaseLayout",
  component: AdminBaseLayout,
  args: {},
} as ComponentMeta<typeof AdminBaseLayout>;

const Template: ComponentStory<typeof AdminBaseLayout> = (args) => (
  <AdminBaseLayout {...args} />
);

export const 기본 = createStoryComponent(Template);
