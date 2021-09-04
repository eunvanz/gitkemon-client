import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import UserRankingTable from "./UserRankingTable";

export default {
  title: "components/UserRankingTable",
  component: UserRankingTable,
  args: {
    users: [mockUsers.user],
  },
} as ComponentMeta<typeof UserRankingTable>;

const Template: ComponentStory<typeof UserRankingTable> = (args) => (
  <UserRankingTable {...args} />
);

export const Default = createStoryComponent(Template);

export const PreviewCollection = createStoryComponent(Template, {
  isPreview: true,
  type: "collection",
});

export const PreviewContributions = createStoryComponent(Template, {
  isPreview: true,
  type: "contributions",
});
