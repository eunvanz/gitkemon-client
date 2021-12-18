import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import SignInModal from "./SignInModal";

export default {
  title: "components/SignInModal",
  component: SignInModal,
  args: {
    isOpen: true,
  },
} as ComponentMeta<typeof SignInModal>;

const Template: ComponentStory<typeof SignInModal> = (args) => <SignInModal {...args} />;

export const 기본 = createStoryComponent(Template);
