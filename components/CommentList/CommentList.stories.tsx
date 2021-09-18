import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockComments from "~/api/mocks/comment";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import CommentList from "./CommentList";

export default {
  title: "components/CommentList",
  component: CommentList,
  args: {
    comments: mockComments.comments,
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Default = createStoryComponent(Template);
