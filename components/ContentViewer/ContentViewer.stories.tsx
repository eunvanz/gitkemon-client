import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockContents from "~/api/mocks/content";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ContentViewer from "./ContentViewer";

export default {
  title: "components/ContentViewer",
  component: ContentViewer,
  args: {
    content: mockContents.content,
  },
} as ComponentMeta<typeof ContentViewer>;

const Template: ComponentStory<typeof ContentViewer> = (args) => (
  <ContentViewer {...args} />
);

export const Default = createStoryComponent(Template);
