import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockMons from "~/api/mocks/mon";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonCardGrid from "../MonCardGrid";
import MonCard from "./MonCard";

export default {
  title: "components/MonCard",
  component: MonCard,
  args: {
    mon: mockMons.cardMon,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof MonCard>;

const Template: ComponentStory<typeof MonCard> = (args) => <MonCard {...args} />;

export const 기본 = createStoryComponent(Template, {
  // @ts-ignore
  onSelect: null,
});

export const 히든 = createStoryComponent(Template, {
  mon: { ...mockMons.cardMon, imageUrl: undefined },
  modalMon: { ...mockMons.activeMons[0] },
});

export const 선택가능 = createStoryComponent(Template, {
  onSelect: () => {},
});

export const 스켈레톤 = createStoryComponent(Template, {
  mon: undefined,
});

export const 그리드 = () => (
  <MonCardGrid>
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
    <MonCard mon={mockMons.cardMon} />
  </MonCardGrid>
);
