import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MarkdownEditor from "./MarkdownEditor";

export default {
  title: "components/MarkdownEditor",
  component: MarkdownEditor,
  args: {},
} as ComponentMeta<typeof MarkdownEditor>;

const Template: ComponentStory<typeof MarkdownEditor> = (args) => (
  <MarkdownEditor {...args} />
);

export const Default = createStoryComponent(Template);
