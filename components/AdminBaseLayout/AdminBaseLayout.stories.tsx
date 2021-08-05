import { action } from "@storybook/addon-actions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import AdminBaseLayout from "./AdminBaseLayout";

export default {
  title: "components/AdminBaseLayout",
  component: AdminBaseLayout,
  args: {
    menuItems: [
      {
        name: "Mon image management",
        onClick: action("onClick"),
      },
      {
        name: "Mon management",
        onClick: action("onClick"),
      },
    ],
    children: <div style={{ background: "blue", height: "100vh" }}></div>,
  },
} as ComponentMeta<typeof AdminBaseLayout>;

const Template: ComponentStory<typeof AdminBaseLayout> = (args) => (
  <AdminBaseLayout {...args} />
);

export const 기본 = createStoryComponent(Template);
