import { GiftIcon } from "@heroicons/react/outline";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Button from "./Button";

export default {
  title: "components/Button",
  component: Button,
  args: {
    children: "Button",
    color: "primary",
    size: "md",
    isRound: false,
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const 아이콘없음 = createStoryComponent(Template);

export const 아이콘있음 = createStoryComponent(Template, {
  icon: GiftIcon,
});

export const 로딩 = createStoryComponent(Template, {
  isLoading: true,
});

export const 비활성화 = createStoryComponent(Template, {
  disabled: true,
});
