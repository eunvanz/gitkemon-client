import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MarkdownViewer from "./MarkdownViewer";

export default {
  title: "components/MarkdownViewer",
  component: MarkdownViewer,
  args: {
    text:
      "---\n__Advertisement :)__\n- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image",
  },
} as ComponentMeta<typeof MarkdownViewer>;

const Template: ComponentStory<typeof MarkdownViewer> = (args) => (
  <MarkdownViewer {...args} />
);

export const Default = createStoryComponent(Template);
