import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import HuntResult from "./HuntResult";

export default {
  title: "components/HuntResult",
  component: HuntResult,
  args: {
    pokeBallType: "basic",
    result: [],
  },
} as ComponentMeta<typeof HuntResult>;

const Template: ComponentStory<typeof HuntResult> = (args) => <HuntResult {...args} />;

export const 기본 = createStoryComponent(Template);
