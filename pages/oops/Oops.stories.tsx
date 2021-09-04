import type { ComponentStory, ComponentMeta } from "@storybook/react";
import withMockRouter from "~/.storybook/decorators/withMockRouter";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Oops from "./Oops.view";

export default {
  title: "pages/Oops",
  component: Oops,
  args: {},
  decorators: [withMockRouter()],
} as ComponentMeta<typeof Oops>;

const Template: ComponentStory<typeof Oops> = (args) => <Oops {...args} />;

export const Default = createStoryComponent(Template);
