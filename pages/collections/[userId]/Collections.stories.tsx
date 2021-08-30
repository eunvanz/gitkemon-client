import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import mockMons from "~/api/mocks/mon";
import mockUsers from "~/api/mocks/user";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Collections from "./Collections.view";

export default {
  title: "pages/콜렉션",
  component: Collections,
  args: {
    collections: mockCollections.collections,
    mons: mockMons.activeMons,
    user: mockUsers.user,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof Collections>;

const Template: ComponentStory<typeof Collections> = (args) => <Collections {...args} />;

export const 기본 = createStoryComponent(Template);

export const blendMode = createStoryComponent(Template, {
  isBlendMode: true,
  monToBlend: { ...mockCollections.collections[0], __mon__: mockMons.activeMons[0] },
});

export const 로딩 = createStoryComponent(Template, {
  collections: undefined,
});
