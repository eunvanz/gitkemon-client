import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import SignIn from "./SignIn.view";

export default {
  title: "pages/로그인",
  component: SignIn,
  args: {},
} as ComponentMeta<typeof SignIn>;

const Template: ComponentStory<typeof SignIn> = (args) => <SignIn {...args} />;

export const 기본 = createStoryComponent(Template);
