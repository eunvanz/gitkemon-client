import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import SelectButton from "./SelectButton";

export default {
  title: "components/SelectButton",
  component: SelectButton,
  args: {
    items: [
      {
        displayValue: "First",
        value: 1,
      },
      {
        displayValue: "Second",
        value: 2,
      },
      {
        displayValue: "Third",
        value: 3,
      },
    ],
  },
} as ComponentMeta<typeof SelectButton>;

const Template: ComponentStory<typeof SelectButton> = (args) => (
  <SelectButton {...args} />
);

export const 기본 = createStoryComponent(Template);
