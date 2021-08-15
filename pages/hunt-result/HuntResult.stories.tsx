import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import HuntResult from "./HuntResult.view";

export default {
  title: "pages/포켓몬 채집 결과",
  component: HuntResult,
  args: {
    pokeBallType: "basic",
  },
} as ComponentMeta<typeof HuntResult>;

const Template: ComponentStory<typeof HuntResult> = (args) => <HuntResult {...args} />;

export const 기본 = createStoryComponent(Template);
