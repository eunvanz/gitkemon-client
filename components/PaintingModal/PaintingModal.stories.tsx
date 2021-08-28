import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockPainting from "~/api/mocks/painting";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import PaintingModal from "./PaintingModal";

export default {
  title: "components/PaintingModal",
  component: PaintingModal,
  args: {
    painting: mockPainting.painting,
    isManageable: true,
    isOpen: true,
  },
} as ComponentMeta<typeof PaintingModal>;

const Template: ComponentStory<typeof PaintingModal> = (args) => (
  <PaintingModal {...args} />
);

export const 기본 = createStoryComponent(Template);
