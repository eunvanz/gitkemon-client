import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import DropDownMenu from "./DropDownMenu";

export default {
  title: "components/DropDownMenu",
  component: DropDownMenu,
  args: {
    menuItems: [
      [
        {
          title: "Account Settings",
        },
        {
          title: "Support",
        },
        {
          title: "License",
        },
      ],
      [
        {
          title: "Sign Out",
        },
      ],
    ],
    buttonLabel: "Options",
    origin: "left",
  },
} as ComponentMeta<typeof DropDownMenu>;

const Template: ComponentStory<typeof DropDownMenu> = (args) => (
  <DropDownMenu {...args} />
);

export const 기본 = createStoryComponent(Template);

export const 헤더있음 = createStoryComponent(Template, {
  header: "Signed in as Benjamin",
});
