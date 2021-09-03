import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Error from "./Error.view";

export default {
  title: "pages/Error",
  component: Error,
  args: {},
} as ComponentMeta<typeof Error>;

const Template: ComponentStory<typeof Error> = (args) => <Error {...args} />;

export const 기본 = createStoryComponent(Template);
