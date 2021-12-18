import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import CollectionStatusItem from "./CollectionStatusItem";

export default {
  title: "components/CollectionStatusItem",
  component: CollectionStatusItem,
  args: {
    tier: "basic",
    value: 40,
    max: 120,
  },
} as ComponentMeta<typeof CollectionStatusItem>;

const Template: ComponentStory<typeof CollectionStatusItem> = (args) => (
  <CollectionStatusItem {...args} />
);

export const 기본 = createStoryComponent(Template);
