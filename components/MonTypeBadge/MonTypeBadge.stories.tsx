import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import MonTypeBadge from "./MonTypeBadge";

export default {
  title: "components/MonTypeBadge",
  component: MonTypeBadge,
  args: {
    type: "bug",
  },
} as ComponentMeta<typeof MonTypeBadge>;

const Template: ComponentStory<typeof MonTypeBadge> = (args) => (
  <MonTypeBadge {...args} />
);

export const 기본 = createStoryComponent(Template);
