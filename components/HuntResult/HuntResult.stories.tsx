import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withTestProvider from "../../.storybook/decorators/withTestProvider";
import mockCollections from "../../api/mocks/collection";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import HuntResult from "./HuntResult";

export default {
  title: "components/HuntResult",
  component: HuntResult,
  args: {
    pokeBallType: "basic",
    result: mockCollections.huntResultNew,
    restPokeBalls: 10,
  },
  decorators: [withTestProvider],
} as ComponentMeta<typeof HuntResult>;

const Template: ComponentStory<typeof HuntResult> = (args) => <HuntResult {...args} />;

export const 단일 = createStoryComponent(Template);

export const 멀티 = createStoryComponent(Template, {
  // @ts-ignore
  result: mockCollections.huntResultMulti,
});
