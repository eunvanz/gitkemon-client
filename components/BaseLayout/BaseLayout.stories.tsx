import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import BaseLayout from "./BaseLayout";

export default {
  title: "components/BaseLayout",
  component: BaseLayout,
  args: {},
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = (args) => (
  <BaseLayout {...args} />
);

export const 기본 = createStoryComponent(Template);
