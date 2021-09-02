import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import UserProfileHeader from "./UserProfileHeader";

export default {
  title: "components/UserProfileHeader",
  component: UserProfileHeader,
  args: {
    user: { ...mockUsers.user, id: "mock-uuid" },
    userProfile: { ...mockUsers.userProfile, id: "mock-uuid" },
  },
} as ComponentMeta<typeof UserProfileHeader>;

const Template: ComponentStory<typeof UserProfileHeader> = (args) => (
  <UserProfileHeader {...args} />
);

export const 기본 = createStoryComponent(Template);

export const 로딩 = createStoryComponent(Template, {
  userProfile: undefined,
});
