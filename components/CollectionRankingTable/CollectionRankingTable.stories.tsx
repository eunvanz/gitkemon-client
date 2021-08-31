import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollectionRanking from "~/api/mocks/collectionRanking";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import CollectionRankingTable from "./CollectionRankingTable";

export default {
  title: "components/CollectionRankingTable",
  component: CollectionRankingTable,
  args: {
    collections: mockCollectionRanking.total.items,
    hasNextPage: true,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof CollectionRankingTable>;

const Template: ComponentStory<typeof CollectionRankingTable> = (args) => (
  <CollectionRankingTable {...args} />
);

export const 기본 = createStoryComponent(Template);
