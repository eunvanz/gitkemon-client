import type { ComponentStory, ComponentMeta } from "@storybook/react";
import allMons from "../../../api/mocks/allMons";
import { createStoryComponent } from "../../../helpers/storybookHelpers";
import PaintingUpload from "./PaintingUpload.view";

export default {
  title: "pages/PaintingUpload",
  component: PaintingUpload,
  args: {
    mons: allMons,
  },
} as ComponentMeta<typeof PaintingUpload>;

const Template: ComponentStory<typeof PaintingUpload> = (args) => (
  <PaintingUpload {...args} />
);

export const 기본 = createStoryComponent(Template);
