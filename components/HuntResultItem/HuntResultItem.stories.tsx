import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockCollections from "../../api/mocks/collection";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import HuntResultItem from "./HuntResultItem";

export default {
  title: "components/HuntResultItem",
  component: HuntResultItem,
  args: {
    collection: mockCollections.huntResultNew[0],
  },
} as ComponentMeta<typeof HuntResultItem>;

const Template: ComponentStory<typeof HuntResultItem> = (args) => (
  <HuntResultItem {...args} />
);

export const 기본 = createStoryComponent(Template);
