import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../../helpers/storybookHelpers";
import MonImages from "./MonImages.view";

export default {
  title: "pages/몬 이미지 등록",
  component: MonImages,
  args: {},
} as ComponentMeta<typeof MonImages>;

const Template: ComponentStory<typeof MonImages> = (args) => <MonImages {...args} />;

export const 기본 = createStoryComponent(Template);
