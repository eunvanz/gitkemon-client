import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "../../api/mocks/user";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Donation from "./Donation.view";

export default {
  title: "pages/기부",
  component: Donation,
  args: {
    user: mockUsers.user,
    availableContributions: 1981,
  },
} as ComponentMeta<typeof Donation>;

const Template: ComponentStory<typeof Donation> = (args) => <Donation {...args} />;

export const 기본 = createStoryComponent(Template);
