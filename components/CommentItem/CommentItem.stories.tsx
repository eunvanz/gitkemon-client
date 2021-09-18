import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockComments from "~/api/mocks/comment";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import CommentItem from "./CommentItem";

export default {
  title: "components/CommentItem",
  component: CommentItem,
  args: {
    comment: mockComments.comment,
  },
} as ComponentMeta<typeof CommentItem>;

const Template: ComponentStory<typeof CommentItem> = (args) => <CommentItem {...args} />;

export const Default = createStoryComponent(Template);

export const MyComment = createStoryComponent(Template, {
  user: mockUsers.user,
});
