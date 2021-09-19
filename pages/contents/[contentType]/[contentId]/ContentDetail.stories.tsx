import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockComments from "~/api/mocks/comment";
import mockContents from "~/api/mocks/content";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentDetail from "./ContentDetail.view";

export default {
  title: "pages/ContentDetail",
  component: ContentDetail,
  args: {
    contentType: "notice",
  },
} as ComponentMeta<typeof ContentDetail>;

const Template: ComponentStory<typeof ContentDetail> = (args) => (
  <ContentDetail {...args} />
);

export const New = createStoryComponent(Template, {
  isEditMode: true,
});

export const Edit = createStoryComponent(Template, {
  isEditMode: true,
  content: mockContents.content,
});

export const ViewNotSignedIn = createStoryComponent(Template, {
  isEditMode: false,
  content: mockContents.content,
  comments: mockComments.comments,
});

export const ViewSignedIn = createStoryComponent(Template, {
  isEditMode: false,
  content: mockContents.content,
  comments: mockComments.comments,
  user: mockUsers.user,
});
