import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockComments from "~/api/mocks/comment";
import mockContents from "~/api/mocks/content";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentViewer from "./ContentViewer";

export default {
  title: "components/ContentViewer",
  component: ContentViewer,
  args: {
    content: mockContents.content,
    comments: mockComments.comments,
  },
} as ComponentMeta<typeof ContentViewer>;

const Template: ComponentStory<typeof ContentViewer> = (args) => (
  <ContentViewer {...args} />
);

export const Default = createStoryComponent(Template);

export const SignedIn = createStoryComponent(Template, {
  user: mockUsers.user,
});
