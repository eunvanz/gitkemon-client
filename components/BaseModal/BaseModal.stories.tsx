import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Button from "../Button";
import BaseModal from "./BaseModal";

export default {
  title: "components/BaseModal",
  component: BaseModal,
  args: {
    isOpen: true,
    children: (
      <>
        <Button>test</Button>
      </>
    ),
  },
} as ComponentMeta<typeof BaseModal>;

const Template: ComponentStory<typeof BaseModal> = (args) => <BaseModal {...args} />;

export const 기본 = createStoryComponent(Template);

export const 타이틀_있음 = createStoryComponent(Template, {
  title: "Test title",
});
