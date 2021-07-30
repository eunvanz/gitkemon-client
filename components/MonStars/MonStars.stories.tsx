import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import MonStars from "./MonStars";

export default {
  title: "components/MonStars",
  component: MonStars,
  args: {
    stars: 1,
  },
} as ComponentMeta<typeof MonStars>;

const Template: ComponentStory<typeof MonStars> = (args) => <MonStars {...args} />;

export const 기본 = createStoryComponent(Template);
