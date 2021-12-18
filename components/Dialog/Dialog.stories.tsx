import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Button from "../Button";
import Dialog from "./Dialog";

export default {
  title: "components/Dialog",
  component: Dialog,
  args: {
    isOpen: true,
    children: "Test message",
    title: "Title",
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const 컨펌 = createStoryComponent(Template);

export const 제목없음 = createStoryComponent(Template, {
  title: undefined,
});

export const 얼럿 = createStoryComponent(Template, {
  // @ts-expect-error
  onCancel: null,
});

export const 프로미즈 = () => (
  <>
    <Button
      onClick={() => {
        Dialog.show({ content: "Message" });
      }}
    >
      얼럿
    </Button>
    <Button
      className="ml-2"
      onClick={() => {
        Dialog.confirm({ content: "Message" });
      }}
    >
      컨펌
    </Button>
  </>
);
