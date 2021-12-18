import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "~/.storybook/decorators/withTestProvider";
import mockCollections from "~/api/mocks/collection";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Blend from "./Blend.view";

export default {
  title: "pages/합성",
  component: Blend,
  args: {
    blendMons: mockCollections.collections.slice(0, 2),
    result: mockCollections.huntResultNew[0],
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof Blend>;

const Template: ComponentStory<typeof Blend> = (args) => <Blend {...args} />;

export const 기본 = createStoryComponent(Template);
