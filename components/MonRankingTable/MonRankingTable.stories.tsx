import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollectionRanking from "~/api/mocks/collectionRanking";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonRankingTable from "./MonRankingTable";

export default {
  title: "components/MonRankingTable",
  component: MonRankingTable,
  args: {
    collections: mockCollectionRanking.total.items,
    hasNextPage: true,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof MonRankingTable>;

const Template: ComponentStory<typeof MonRankingTable> = (args) => (
  <MonRankingTable {...args} />
);

export const 기본 = createStoryComponent(Template);
