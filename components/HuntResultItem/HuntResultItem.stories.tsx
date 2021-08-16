import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "../../.storybook/decorators/withTestProvider";
import mockCollections from "../../api/mocks/collection";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import HuntResultItem from "./HuntResultItem";

export default {
  title: "components/HuntResultItem",
  component: HuntResultItem,
  args: {
    huntResult: mockCollections.huntResultNew[0],
    isRevealed: true,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof HuntResultItem>;

const Template: ComponentStory<typeof HuntResultItem> = (args) => (
  <HuntResultItem {...args} />
);

export const 새로운포켓몬 = createStoryComponent(Template);

export const 레벨업 = createStoryComponent(Template, {
  huntResult: mockCollections.huntResultLevelUp[0],
});
