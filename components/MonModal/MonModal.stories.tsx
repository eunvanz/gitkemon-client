import type { ComponentStory, ComponentMeta } from "@storybook/react";
import mockMons from "../../api/mocks/mon";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import MonModal from "./MonModal";

export default {
  title: "components/MonModal",
  component: MonModal,
  args: {
    mon: mockMons.cardMon,
    isOpen: true,
  },
} as ComponentMeta<typeof MonModal>;

const Template: ComponentStory<typeof MonModal> = (args) => <MonModal {...args} />;

export const 기본 = createStoryComponent(Template);