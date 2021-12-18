import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Input from "./Input";

export default {
  title: "components/Input",
  component: Input,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    hint: "Hint text",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const 기본 = createStoryComponent(Template);

export const 에러 = createStoryComponent(Template, {
  hasError: true,
  errorMessage: "Error message",
});
