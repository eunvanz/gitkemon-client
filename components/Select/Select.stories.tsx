import { useState } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Select from "./Select";

export default {
  title: "components/Select",
  component: Select,
  args: {
    label: "Label",
    items: [
      { value: 1, displayValue: "이상해씨" },
      { value: 2, displayValue: "이상해풀" },
      { value: 3, displayValue: "이상해꽃" },
    ],
    placeholder: "선택해주세요",
    hint: "Hint text",
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const 기본 = createStoryComponent(Template);

export const 오류 = createStoryComponent(Template, {
  hasError: true,
  errorMessage: "Error message",
});

export const 컨테이너 = () => {
  const items = [
    { value: 1, displayValue: "이상해씨" },
    { value: 2, displayValue: "이상해풀" },
    { value: 3, displayValue: "이상해꽃" },
  ];

  const [selectedItem, setSelectedItem] = useState<number | undefined>(undefined);

  return (
    <Select
      label="포켓몬"
      className="w-40"
      onChange={(item) => setSelectedItem(item)}
      items={items}
      value={selectedItem}
    />
  );
};
