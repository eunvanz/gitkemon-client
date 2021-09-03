import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withContentContainer from "~/.storybook/decorators/withContentContainer";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Profile from "./Profile.view";

export default {
  title: "pages/Profile",
  component: Profile,
  args: {
    user: mockUsers.user,
    collectionRank: 12,
    collectionStatus: {
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
        myth: {
          value: 1,
          max: 10,
        },
      },
      colPointInfo: {
        value: 400,
        max: 1000,
      },
    },
    monRanks: [1, 40, 123],
    topMons: mockCollections.collections.slice(0, 3),
    recentMons: mockCollections.collections.slice(0, 3),
  },
  decorators: [
    withTestProvider,
    withMockRouter({
      query: {
        userId: "mock-uuid",
      },
    }),
    withContentContainer,
  ],
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => <Profile {...args} />;

export const 기본 = createStoryComponent(Template);

export const noPokemons = createStoryComponent(Template, {
  monRanks: [],
  topMons: [],
  recentMons: [],
});
