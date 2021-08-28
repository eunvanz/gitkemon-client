import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Likes from "./Likes";

export default {
  title: "components/Likes",
  component: Likes,
  args: {
    likesCnt: 114212,
  },
} as ComponentMeta<typeof Likes>;

const Template: ComponentStory<typeof Likes> = (args) => <Likes {...args} />;

export const 기본 = createStoryComponent(Template);

export const Liked = createStoryComponent(Template, {
  isLiked: true,
});
