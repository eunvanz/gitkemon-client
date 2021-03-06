import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import mockRareNews from "~/api/mocks/rareNews";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import RareNewsCard from "./RareNewsCard";

export default {
  title: "components/RareNewsCard",
  component: RareNewsCard,
  args: {
    item: {
      ...mockRareNews.rareNewsItem,
      collection: {
        ...mockCollections.collections[0],
        potential: "SS",
        tier: "legend",
      },
    },
  },
  decorators: [withTestProvider, withMockRouter()],
} as ComponentMeta<typeof RareNewsCard>;

const Template: ComponentStory<typeof RareNewsCard> = (args) => (
  <RareNewsCard {...args} />
);

export const Default = createStoryComponent(Template);
