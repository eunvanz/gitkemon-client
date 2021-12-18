import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import ButtonGroup from "./ButtonGroup";

export default {
  title: "components/ButtonGroup",
  component: ButtonGroup,
  args: {
    children: [
      <button key={1}>First</button>,
      <button key={2}>Second</button>,
      <button key={3}>Third</button>,
    ],
  },
} as ComponentMeta<typeof ButtonGroup>;

const Template: ComponentStory<typeof ButtonGroup> = (args) => <ButtonGroup {...args} />;

export const 기본 = createStoryComponent(Template);
