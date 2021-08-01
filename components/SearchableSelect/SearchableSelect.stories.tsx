import { useState } from "react";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import SearchableSelect from "./SearchableSelect";

export default {
  title: "components/SearchableSelect",
  component: SearchableSelect,
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
} as ComponentMeta<typeof SearchableSelect>;

const Template: ComponentStory<typeof SearchableSelect> = (args) => (
  <SearchableSelect {...args} />
);

export const 기본 = createStoryComponent(Template);

export const 컨테이너 = () => {
  const items = [
    { value: 1, displayValue: "이상해씨" },
    { value: 2, displayValue: "이상해풀" },
    { value: 3, displayValue: "이상해꽃" },
  ];

  const [selectedItem, setSelectedItem] = useState<number | undefined>(undefined);

  return (
    <SearchableSelect
      label="포켓몬"
      className="w-40"
      onChange={(item) => setSelectedItem(item)}
      items={items}
      value={selectedItem}
    />
  );
};
