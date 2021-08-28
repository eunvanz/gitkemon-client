import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import PaintingCard from "./PaintingCard";

export default {
  title: "components/PaintingCard",
  component: PaintingCard,
  args: {},
} as ComponentMeta<typeof PaintingCard>;

const Template: ComponentStory<typeof PaintingCard> = (args) => (
  <PaintingCard {...args} />
);

export const 기본 = createStoryComponent(Template);
