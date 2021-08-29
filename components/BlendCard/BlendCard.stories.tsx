import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import BlendCard from "./BlendCard";

export default {
  title: "components/BlendCard",
  component: BlendCard,
  args: {
    blendMons: [mockCollections.collections[0], mockCollections.collections[1]],
    result: mockCollections.huntResultLevelUp[0],
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof BlendCard>;

const Template: ComponentStory<typeof BlendCard> = (args) => <BlendCard {...args} />;

export const 기본 = createStoryComponent(Template);
