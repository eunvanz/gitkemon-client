import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Button from "../Button";
import NewBadge from "./NewBadge";

export default {
  title: "components/NewBadge",
  component: NewBadge,
  args: {},
} as ComponentMeta<typeof NewBadge>;

const Template: ComponentStory<typeof NewBadge> = (args) => <NewBadge {...args} />;

export const 기본 = createStoryComponent(Template);

export const 예시 = () => {
  return (
    <div className="p-2">
      <NewBadge>
        <Button>Button</Button>
      </NewBadge>
    </div>
  );
};
