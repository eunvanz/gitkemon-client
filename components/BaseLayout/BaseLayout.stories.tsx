import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "../../api/mocks/user";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import BaseLayout from "./BaseLayout";

export default {
  title: "components/BaseLayout",
  component: BaseLayout,
  args: {
    children: "content",
  },
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = (args) => (
  <BaseLayout {...args} />
);

export const 로그아웃 = createStoryComponent(Template);

export const 로그인 = createStoryComponent(Template, {
  user: mockUsers.user,
});
