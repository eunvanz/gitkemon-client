import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { MON_STARS, MON_TIERS, MON_TYPES } from "~/constants/rules";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import CollectionFilter from "./CollectionFilter";

export default {
  title: "components/CollectionFilter",
  component: CollectionFilter,
  args: {
    filterState: {
      has: [true, false],
      tier: MON_TIERS,
      type: MON_TYPES,
      stars: MON_STARS,
    },
  },
} as ComponentMeta<typeof CollectionFilter>;

const Template: ComponentStory<typeof CollectionFilter> = (args) => (
  <CollectionFilter {...args} />
);

export const 기본 = createStoryComponent(Template);
