import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import CollectionStatus from "./CollectionStatus";

export default {
  title: "components/CollectionStatus",
  component: CollectionStatus,
  args: {
    countInfo: {
      basic: {
        value: 20,
        max: 100,
      },
      rare: {
        value: 30,
        max: 40,
      },
      special: {
        value: 20,
        max: 80,
      },
      "s.rare": {
        value: 20,
        max: 50,
      },
      elite: {
        value: 20,
        max: 20,
      },
      legend: {
        value: 2,
        max: 20,
      },
    },
    colPointInfo: {
      value: 400,
      max: 1000,
    },
  },
} as ComponentMeta<typeof CollectionStatus>;

const Template: ComponentStory<typeof CollectionStatus> = (args) => (
  <CollectionStatus {...args} />
);

export const 기본 = createStoryComponent(Template);
