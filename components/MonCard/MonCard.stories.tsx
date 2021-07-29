import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockMons from "../../api/mocks/mon";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import MonCard from "./MonCard";

export default {
  title: "components/MonCard",
  component: MonCard,
  args: {
    mon: mockMons.cardMon,
  },
} as ComponentMeta<typeof MonCard>;

const Template: ComponentStory<typeof MonCard> = (args) => <MonCard {...args} />;

export const 기본 = createStoryComponent(Template);

export const 그리드 = () => (
  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
  </div>
);
