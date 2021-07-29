import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Toggle from "./Toggle";

export default {
  title: "components/Toggle",
  component: Toggle,
  args: {},
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const 기본 = createStoryComponent(Template);

export const 라벨_텍스트 = createStoryComponent(Template, {
  label: "Label",
});

export const 라벨_컴포넌트 = createStoryComponent(Template, {
  label: (
    <>
      <span className="text-sm font-medium text-gray-900">Annual billing </span>
      <span className="text-sm text-gray-500">(Save 10%)</span>
    </>
  ),
});
