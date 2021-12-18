import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { createStoryComponent } from "~/helpers/storybookHelpers";
import Typography from "./Typography";

export default {
  title: "components/Typography",
  component: Typography,
  args: {
    children: "The quick brown fox jumped over the lazy dog.",
  },
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args} />;

export const 기본 = createStoryComponent(Template);
