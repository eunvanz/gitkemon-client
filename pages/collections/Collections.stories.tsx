import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "../../.storybook/decorators/withTestProvider";
import mockCollections from "../../api/mocks/collection";
import mockMons from "../../api/mocks/mon";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Collections from "./Collections.view";

export default {
  title: "pages/콜렉션",
  component: Collections,
  args: {
    collections: mockCollections.collections,
    mons: mockMons.activeMons,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof Collections>;

const Template: ComponentStory<typeof Collections> = (args) => <Collections {...args} />;

export const 기본 = createStoryComponent(Template);
