import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import LevelBadge from "./LevelBadge";

export default {
  title: "components/LevelBadge",
  component: LevelBadge,
  args: {
    level: 1,
  },
} as ComponentMeta<typeof LevelBadge>;

const Template: ComponentStory<typeof LevelBadge> = (args) => <LevelBadge {...args} />;

export const 기본 = createStoryComponent(Template);

export const 진화가능 = createStoryComponent(Template, {
  level: 20,
  evolvableLevel: 4,
});
