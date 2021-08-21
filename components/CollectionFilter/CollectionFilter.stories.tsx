import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import CollectionFilter from "./CollectionFilter";

export default {
  title: "components/CollectionFilter",
  component: CollectionFilter,
  args: {},
} as ComponentMeta<typeof CollectionFilter>;

const Template: ComponentStory<typeof CollectionFilter> = (args) => (
  <CollectionFilter {...args} />
);

export const 기본 = createStoryComponent(Template);
