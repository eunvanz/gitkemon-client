import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import BaseLayout from "./BaseLayout";

export default {
  title: "components/BaseLayout",
  component: BaseLayout,
  args: {
    children: "content",
  },
  decorators: [withMockRouter()],
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = (args) => <BaseLayout {...args} />;

export const 로그아웃 = createStoryComponent(Template);

export const 로그인 = createStoryComponent(Template, {
  user: mockUsers.user,
});

export const 로그인_컨트리뷰션있음 = createStoryComponent(Template, {
  user: mockUsers.user,
  availableContributions: 200,
});
