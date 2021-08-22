import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "../../.storybook/decorators/withTestProvider";
import mockCollections from "../../api/mocks/collection";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Evolution from "./Evolution.view";

export default {
  title: "pages/진화",
  component: Evolution,
  args: {
    evolveMon: mockCollections.collections[0],
    result: mockCollections.huntResultNew[0],
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof Evolution>;

const Template: ComponentStory<typeof Evolution> = (args) => <Evolution {...args} />;

export const 기본 = createStoryComponent(Template);
