import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "../../helpers/storybookHelpers";
import Loading from "./Loading";

export default {
  title: "components/Loading",
  component: Loading,
  args: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => <Loading {...args} />;

export const 기본 = createStoryComponent(Template);
