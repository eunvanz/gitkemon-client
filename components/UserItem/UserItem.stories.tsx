import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import UserItem from "./UserItem";

export default {
  title: "components/UserItem",
  component: UserItem,
  args: {
    user: mockUsers.user,
  },
} as ComponentMeta<typeof UserItem>;

const Template: ComponentStory<typeof UserItem> = (args) => <UserItem {...args} />;

export const Default = createStoryComponent(Template);

export const HasSuffix = createStoryComponent(Template, {
  suffix: " · 2h",
});
