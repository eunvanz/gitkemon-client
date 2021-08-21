import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Accordion from "./Accordion";

export default {
  title: "components/Accordion",
  component: Accordion,
  args: {
    title: "Test",
    children: "Contents",
  },
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => <Accordion {...args} />;

export const 기본 = createStoryComponent(Template);
