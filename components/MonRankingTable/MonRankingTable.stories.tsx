import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockMonRanking from "~/api/mocks/monRanking";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonRankingTable from "./MonRankingTable";

export default {
  title: "components/MonRankingTable",
  component: MonRankingTable,
  args: {
    collections: mockMonRanking.total.items,
    hasNextPage: true,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof MonRankingTable>;

const Template: ComponentStory<typeof MonRankingTable> = (args) => (
  <MonRankingTable {...args} />
);

export const Default = createStoryComponent(Template);

export const Preview = createStoryComponent(Template, {
  isPreview: true,
});
