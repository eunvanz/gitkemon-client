import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "../../api/mocks/user";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Payback from "./Payback.view";

export default {
  title: "pages/보상",
  component: Payback,
  args: {
    user: mockUsers.user,
    availableContributions: 1981,
  },
} as ComponentMeta<typeof Payback>;

const Template: ComponentStory<typeof Payback> = (args) => <Payback {...args} />;

export const 기본 = createStoryComponent(Template);
