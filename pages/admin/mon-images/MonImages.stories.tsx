import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockMonImage from "~/api/mocks/monImage";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonImages from "./MonImages.view";

export default {
  title: "pages/admin/몬스터 이미지/목록",
  component: MonImages,
  args: {
    monImages: mockMonImage.monImages,
  },
} as ComponentMeta<typeof MonImages>;

const Template: ComponentStory<typeof MonImages> = (args) => <MonImages {...args} />;

export const 기본 = createStoryComponent(Template);
