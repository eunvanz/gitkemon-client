import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Checkbox from "./Checkbox";

export default {
  title: "components/Checkbox",
  component: Checkbox,
  args: {
    label: "Label",
    id: "label",
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const 기본 = createStoryComponent(Template);
